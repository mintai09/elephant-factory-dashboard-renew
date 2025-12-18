import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

// PDF 다운로드 함수
export const exportToPDF = async (companyData, elementId = 'root') => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // 헤더 추가
    pdf.setFontSize(20);
    pdf.setTextColor(59, 130, 246);
    pdf.text('코끼리공장 ESG 대시보드', pageWidth / 2, 20, { align: 'center' });

    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`${companyData.info.name} - ESG 성과 보고서`, pageWidth / 2, 30, { align: 'center' });

    pdf.setFontSize(10);
    pdf.setTextColor(107, 114, 128);
    pdf.text(`생성일: ${new Date().toLocaleDateString('ko-KR')}`, pageWidth / 2, 37, { align: 'center' });

    let yPos = 50;

    // 2025 Q1 성과 요약
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text('📊 2025 Q1 성과 요약', 15, yPos);
    yPos += 10;

    const performanceData = [
      ['지표', '값'],
      ['참여 임직원', `${companyData.performance.participants}명`],
      ['수거량', `${companyData.performance.collectionAmount.toLocaleString()}kg`],
      ['CO₂ 절감량', `${companyData.performance.co2Reduction}톤`],
      ['일자리 창출', `${companyData.performance.jobCreation}시간`],
      ['수혜 아동', `${companyData.performance.childrenSupported}명`],
      ['참여율', `${companyData.performance.participationRate}%`]
    ];

    autoTable(pdf, {
      startY: yPos,
      head: [performanceData[0]],
      body: performanceData.slice(1),
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246], textColor: 255 },
      margin: { left: 15, right: 15 }
    });

    yPos = pdf.lastAutoTable.finalY + 15;

    // 새 페이지 체크
    if (yPos > pageHeight - 40) {
      pdf.addPage();
      yPos = 20;
    }

    // Tier 1 핵심 KPI
    pdf.setFontSize(14);
    pdf.text('🔑 핵심 KPI (Tier 1)', 15, yPos);
    yPos += 10;

    const tier1Data = [
      ['KPI', '값', '등급'],
      ['탄소 저감 기여도', `${companyData.kpi.carbonReduction.monthly} tonnes`, companyData.kpi.carbonReduction.grade],
      ['순환 자원 기여도', `${companyData.kpi.circularResource.conversionRate}%`, companyData.kpi.circularResource.grade],
      ['사회적 임팩트 지수', `${(companyData.kpi.socialImpact.monthlyValue / 10000).toLocaleString()}만원`, companyData.kpi.socialImpact.grade]
    ];

    autoTable(pdf, {
      startY: yPos,
      head: [tier1Data[0]],
      body: tier1Data.slice(1),
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246], textColor: 255 },
      margin: { left: 15, right: 15 }
    });

    // ESG 점수 (새 페이지)
    pdf.addPage();
    yPos = 20;

    pdf.setFontSize(14);
    pdf.text('🎯 ESG 종합 평가', 15, yPos);
    yPos += 10;

    const esgData = [
      ['항목', '점수'],
      ['환경 (E)', `${companyData.esgScores.environmental}%`],
      ['사회 (S)', `${companyData.esgScores.social}%`],
      ['지배구조 (G)', `${companyData.esgScores.governance}%`],
      ['종합', `${companyData.esgScores.overall}점`]
    ];

    autoTable(pdf, {
      startY: yPos,
      head: [esgData[0]],
      body: esgData.slice(1),
      theme: 'grid',
      headStyles: { fillColor: [16, 185, 129], textColor: 255 },
      margin: { left: 15, right: 15 }
    });

    // 푸터 추가
    const totalPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setTextColor(107, 114, 128);
      pdf.text(
        `페이지 ${i} / ${totalPages}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      );
      pdf.text(
        '🌱 코끼리공장 ESG 대시보드',
        pageWidth - 15,
        pageHeight - 10,
        { align: 'right' }
      );
    }

    // PDF 저장
    pdf.save(`${companyData.info.name}_ESG_Report_${new Date().toISOString().split('T')[0]}.pdf`);

    return { success: true, message: 'PDF 다운로드가 완료되었습니다.' };
  } catch (error) {
    console.error('PDF 생성 오류:', error);
    return { success: false, message: 'PDF 생성 중 오류가 발생했습니다.' };
  }
};

// Excel 내보내기 함수
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

    // 열 너비 설정
    ws1['!cols'] = [
      { wch: 20 },
      { wch: 20 },
      { wch: 20 }
    ];

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
    ws2['!cols'] = [
      { wch: 25 },
      { wch: 20 },
      { wch: 20 },
      { wch: 15 },
      { wch: 15 }
    ];

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
    ws3['!cols'] = [
      { wch: 20 },
      { wch: 15 }
    ];

    XLSX.utils.book_append_sheet(wb, ws3, 'ESG 점수');

    // 시트 4: 시계열 데이터
    if (companyData.timeSeries && companyData.timeSeries.length > 0) {
      const timeSeriesSheet = [
        ['분기별 추이'],
        [],
        ['분기', '수거량(kg)', '참여자(명)', 'CO₂ 절감(tonnes)']
      ];

      companyData.timeSeries.forEach(data => {
        timeSeriesSheet.push([
          data.quarter,
          data.collection,
          data.participants,
          data.co2 || 0
        ]);
      });

      const ws4 = XLSX.utils.aoa_to_sheet(timeSeriesSheet);
      ws4['!cols'] = [
        { wch: 15 },
        { wch: 15 },
        { wch: 15 },
        { wch: 20 }
      ];

      XLSX.utils.book_append_sheet(wb, ws4, '분기별 추이');
    }

    // Excel 파일 저장
    XLSX.writeFile(wb, `${companyData.info.name}_ESG_Data_${new Date().toISOString().split('T')[0]}.xlsx`);

    return { success: true, message: 'Excel 파일이 다운로드되었습니다.' };
  } catch (error) {
    console.error('Excel 생성 오류:', error);
    return { success: false, message: 'Excel 생성 중 오류가 발생했습니다.' };
  }
};

// PNG 스크린샷 함수
export const exportToPNG = async (elementId = 'root', filename = 'dashboard') => {
  try {
    const element = document.getElementById(elementId) || document.querySelector('.main-content');

    if (!element) {
      throw new Error('캡처할 요소를 찾을 수 없습니다.');
    }

    // 스크롤 위치 저장
    const scrollY = window.scrollY;

    // 최상단으로 이동
    window.scrollTo(0, 0);

    // 잠시 대기 (렌더링 완료 대기)
    await new Promise(resolve => setTimeout(resolve, 500));

    const canvas = await html2canvas(element, {
      scale: 2, // 고해상도
      useCORS: true,
      logging: false,
      backgroundColor: '#F9FAFB',
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight
    });

    // 원래 스크롤 위치로 복귀
    window.scrollTo(0, scrollY);

    // Canvas를 이미지로 변환
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

// Dashboard용 PDF 내보내기 (전체 대시보드)
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
    pdf.text('📊 전체 기업 통합 성과', 15, yPos);
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

    // 기업별 성과 (새 페이지)
    pdf.addPage();
    yPos = 20;

    pdf.setFontSize(14);
    pdf.text('🏆 기업별 성과 순위', 15, yPos);
    yPos += 10;

    const companyDataTable = [
      ['순위', '기업명', '수거량(kg)', 'CO₂(tonnes)', '참여인원', 'ESG점수']
    ];

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
      pdf.text(
        `페이지 ${i} / ${totalPages}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      );
    }

    pdf.save(`ESG_Dashboard_Report_${new Date().toISOString().split('T')[0]}.pdf`);

    return { success: true, message: 'PDF 다운로드가 완료되었습니다.' };
  } catch (error) {
    console.error('PDF 생성 오류:', error);
    return { success: false, message: 'PDF 생성 중 오류가 발생했습니다.' };
  }
};
