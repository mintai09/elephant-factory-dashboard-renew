import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

// PDF 다운로드 (화면 캡처 기반: 한글 깨짐 방지 + 화면 레이아웃 유지)
export const exportToPDF = async (companyData, elementId = 'root') => {
  try {
    const target =
      document.getElementById(elementId) ||
      document.querySelector('.main-content') ||
      document.body;

    if (!target) {
      return { success: false, message: 'PDF로 내보낼 영역을 찾을 수 없습니다.' };
    }

    const canvas = await html2canvas(target, {
      scale: 2,
      useCORS: true,
      windowWidth: target.scrollWidth,
      windowHeight: target.scrollHeight
    });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const headerHeight = 20;

    const imgWidth = pageWidth - margin * 2;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // 헤더 (영문 표기로 폰트 깨짐 최소화)
    pdf.setFontSize(14);
    pdf.text('Elephant Factory ESG Dashboard', pageWidth / 2, 12, { align: 'center' });
    pdf.setFontSize(11);
    pdf.text(companyData?.info?.name ? `${companyData.info.name}` : 'Company Report', pageWidth / 2, 18, { align: 'center' });

    let position = headerHeight;
    pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);

    let heightLeft = imgHeight - (pageHeight - position - margin);
    while (heightLeft > 0) {
      pdf.addPage();
      position = margin;
      pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      heightLeft -= (pageHeight - margin * 2);
    }

    pdf.save(`${companyData?.info?.name || 'ESG'}_Dashboard_${new Date().toISOString().split('T')[0]}.pdf`);
    return { success: true, message: 'PDF 다운로드가 완료되었습니다.' };
  } catch (error) {
    console.error('PDF 생성 오류:', error);
    return { success: false, message: 'PDF 생성 중 오류가 발생했습니다.' };
  }
};

// Excel 내보내기
export const exportToExcel = (companyData) => {
  try {
    const wb = XLSX.utils.book_new();

    // 시트 1: 성과 요약
    const performanceSheet = [
      ['코끼리공장 ESG 대시보드'],
      [`${companyData.info.name} - 성과 요약`],
      [`생성일: ${new Date().toLocaleDateString('ko-KR')}`],
      [],
      ['지표', '값', '순위'],
      ['참여 임직원', `${companyData.performance.participants}명`, `${companyData.performance.ranking.participants}위/12개`],
      ['수거량', `${companyData.performance.collectionAmount}kg`, `${companyData.performance.ranking.collection}위/12개`],
      ['CO₂ 절감량', `${companyData.performance.co2Reduction}톤`, `${companyData.performance.ranking.co2}위/12개`],
      ['일자리 창출', `${companyData.performance.jobCreation}시간`, ''],
      ['수혜 아동', `${companyData.performance.childrenSupported}명`, ''],
      ['참여율', `${companyData.performance.participationRate}%`, '']
    ];

    const ws1 = XLSX.utils.aoa_to_sheet(performanceSheet);
    ws1['!cols'] = [{ wch: 20 }, { wch: 20 }, { wch: 20 }];
    XLSX.utils.book_append_sheet(wb, ws1, '성과 요약');

    // 시트 2: 핵심 KPI
    const kpiSheet = [
      ['핵심 KPI (Tier 1)'],
      [],
      ['KPI', '값', '목표', '달성률', '등급'],
      [
        '탄소 저감 기여도',
        `${companyData.kpi.carbonReduction.monthly} tonnes`,
        `${companyData.kpi.carbonReduction.target} tonnes`,
        `${companyData.kpi.carbonReduction.achieved}%`,
        companyData.kpi.carbonReduction.grade
      ],
      [
        '순환 자원 기여도',
        `${companyData.kpi.circularResource.conversionRate}%`,
        '',
        '',
        companyData.kpi.circularResource.grade
      ],
      [
        '사회적 임팩트 지수',
        `${companyData.kpi.socialImpact.monthlyValue}원`,
        '',
        '',
        companyData.kpi.socialImpact.grade
      ]
    ];
    const ws2 = XLSX.utils.aoa_to_sheet(kpiSheet);
    ws2['!cols'] = [{ wch: 25 }, { wch: 20 }, { wch: 20 }, { wch: 15 }, { wch: 15 }];
    XLSX.utils.book_append_sheet(wb, ws2, '핵심 KPI');

    // 시트 3: ESG 점수
    const esgSheet = [
      ['ESG 종합 평가'],
      [],
      ['항목', '점수'],
      ['환경 (E)', companyData.esgScores.environmental],
      ['사회 (S)', companyData.esgScores.social],
      ['지배구조 (G)', companyData.esgScores.governance],
      [],
      ['종합 점수', companyData.esgScores.overall]
    ];
    const ws3 = XLSX.utils.aoa_to_sheet(esgSheet);
    ws3['!cols'] = [{ wch: 20 }, { wch: 15 }];
    XLSX.utils.book_append_sheet(wb, ws3, 'ESG 점수');

    // 시트 4: 시계열 데이터
    if (companyData.timeSeries && companyData.timeSeries.length > 0) {
      const timeSeriesSheet = [
        ['분기별 추이'],
        [],
        ['분기', '수거량(kg)', '참여자(명)', 'CO₂ 절감(tonnes)']
      ];
      companyData.timeSeries.forEach((row) => {
        timeSeriesSheet.push([row.quarter, row.collection, row.participants, row.co2 || 0]);
      });
      const ws4 = XLSX.utils.aoa_to_sheet(timeSeriesSheet);
      ws4['!cols'] = [{ wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 20 }];
      XLSX.utils.book_append_sheet(wb, ws4, '분기별 추이');
    }

    XLSX.writeFile(wb, `${companyData.info.name}_ESG_Data_${new Date().toISOString().split('T')[0]}.xlsx`);
    return { success: true, message: 'Excel 파일이 다운로드되었습니다.' };
  } catch (error) {
    console.error('Excel 생성 오류:', error);
    return { success: false, message: 'Excel 생성 중 오류가 발생했습니다.' };
  }
};

// PNG 스크린샷
export const exportToPNG = async (elementId = 'root', filename = 'dashboard') => {
  try {
    const element = document.getElementById(elementId) || document.querySelector('.main-content');
    if (!element) {
      throw new Error('캡처할 요소를 찾을 수 없습니다.');
    }

    const scrollY = window.scrollY;
    window.scrollTo(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#F9FAFB',
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight
    });

    window.scrollTo(0, scrollY);

    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}_${new Date().toISOString().split('T')[0]}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });

    return { success: true, message: 'PNG 이미지가 저장되었습니다.' };
  } catch (error) {
    console.error('PNG 생성 오류:', error);
    return { success: false, message: 'PNG 생성 중 오류가 발생했습니다.' };
  }
};

// 대시보드 통합 PDF (표 기반)
export const exportDashboardToPDF = async (companies, totalData) => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // 헤더
    pdf.setFontSize(20);
    pdf.setTextColor(59, 130, 246);
    pdf.text('코끼리공장 ESG 임팩트 대시보드', pageWidth / 2, 20, { align: 'center' });

    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text('전체 기업 통합 성과 보고서', pageWidth / 2, 30, { align: 'center' });

    pdf.setFontSize(10);
    pdf.setTextColor(107, 114, 128);
    pdf.text(`생성일: ${new Date().toLocaleDateString('ko-KR')}`, pageWidth / 2, 37, { align: 'center' });

    let yPos = 50;

    // 전체 통합 성과
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text('전체 기업 통합 성과', 15, yPos);
    yPos += 10;

    const totalDataTable = [
      ['지표', '값'],
      ['참여 기업', `${companies.length}개`],
      ['총 참여 인원', `${totalData.participants.toLocaleString()}명`],
      ['총 수거량', `${totalData.collection.toLocaleString()}kg`],
      ['총 CO₂ 저감', `${totalData.co2.toFixed(1)}톤`]
    ];

    autoTable(pdf, {
      startY: yPos,
      head: [totalDataTable[0]],
      body: totalDataTable.slice(1),
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246], textColor: 255 },
      margin: { left: 15, right: 15 }
    });

    yPos = pdf.lastAutoTable.finalY + 15;

    // 기업별 성과
    pdf.addPage();
    yPos = 20;
    pdf.setFontSize(14);
    pdf.text('기업별 성과 순위', 15, yPos);
    yPos += 10;

    const companyDataTable = [['순위', '기업명', '수거량(kg)', 'CO₂(tonnes)', '참여인원', 'ESG점수']];
    companies.forEach((company, index) => {
      companyDataTable.push([
        `${index + 1}`,
        company.name,
        company.performance.collectionAmount.toLocaleString(),
        company.performance.co2Reduction.toFixed(2),
        `${company.performance.participants}명`,
        `${company.esgScore}점`
      ]);
    });

    autoTable(pdf, {
      startY: yPos,
      head: [companyDataTable[0]],
      body: companyDataTable.slice(1),
      theme: 'striped',
      headStyles: { fillColor: [16, 185, 129], textColor: 255 },
      margin: { left: 15, right: 15 },
      styles: { fontSize: 8 }
    });

    // 푸터
    const totalPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setTextColor(107, 114, 128);
      pdf.text(`페이지 ${i} / ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    }

    pdf.save(`ESG_Dashboard_Report_${new Date().toISOString().split('T')[0]}.pdf`);
    return { success: true, message: 'PDF 다운로드가 완료되었습니다.' };
  } catch (error) {
    console.error('PDF 생성 오류:', error);
    return { success: false, message: 'PDF 생성 중 오류가 발생했습니다.' };
  }
};
