import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { getCompanyData } from '../data/companiesData';
import { exportToPDF, exportToExcel, exportToPNG } from '../utils/exportUtils';

function CompanyDetail({ fixedCompanyId }) {
  const { companyId: urlCompanyId } = useParams();
  const companyId = fixedCompanyId || urlCompanyId;
  const data = getCompanyData(companyId);
  const [isExporting, setIsExporting] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [selectedYear, setSelectedYear] = useState('all'); // 'all', '2024', '2025'
  const [selectedQuarter, setSelectedQuarter] = useState('all'); // 'all', 'Q1', 'Q2', 'Q3', 'Q4'
  const [isTier2Collapsed, setIsTier2Collapsed] = useState(true); // 보조 KPI 토글

  // 툴팁 토글 함수
  const toggleTooltip = (tooltipId) => {
    setActiveTooltip(activeTooltip === tooltipId ? null : tooltipId);
  };

  // 로그인 사용자 정보 확인
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
  const isAdmin = userInfo && userInfo.role === 'admin';

  // Export 핸들러
  const handlePDFExport = async () => {
    setIsExporting(true);
    const result = await exportToPDF(data);
    setIsExporting(false);
    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  const handleExcelExport = () => {
    setIsExporting(true);
    const result = exportToExcel(data);
    setIsExporting(false);
    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  const handlePNGExport = async () => {
    setIsExporting(true);
    const result = await exportToPNG('root', `${data.info.name}_Dashboard`);
    setIsExporting(false);
    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  // 분기별 결과 전용 Export 핸들러
  const handleQuarterlyPDFExport = async () => {
    setIsExporting(true);
    const quarterLabel = getFilteredQuarterLabel();
    const element = document.getElementById('quarterly-results-section');
    if (!element) {
      alert('분기별 결과 섹션을 찾을 수 없습니다.');
      setIsExporting(false);
      return;
    }

    try {
      const html2pdf = (await import('html2pdf.js')).default;
      await html2pdf()
        .set({
          margin: 10,
          filename: `${data.info.name}_${quarterLabel}_분기별결과.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        })
        .from(element)
        .save();
      alert(`PDF 다운로드가 완료되었습니다: ${data.info.name}_${quarterLabel}_분기별결과.pdf`);
    } catch (error) {
      alert('PDF 생성 중 오류가 발생했습니다.');
      console.error(error);
    }
    setIsExporting(false);
  };

  const handleQuarterlyPNGExport = async () => {
    setIsExporting(true);
    const quarterLabel = getFilteredQuarterLabel();
    const element = document.getElementById('quarterly-results-section');
    if (!element) {
      alert('분기별 결과 섹션을 찾을 수 없습니다.');
      setIsExporting(false);
      return;
    }

    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });

      const link = document.createElement('a');
      link.download = `${data.info.name}_${quarterLabel}_분기별결과.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      alert(`PNG 다운로드가 완료되었습니다: ${data.info.name}_${quarterLabel}_분기별결과.png`);
    } catch (error) {
      alert('PNG 생성 중 오류가 발생했습니다.');
      console.error(error);
    }
    setIsExporting(false);
  };

  const handleQuarterlyExcelExport = () => {
    setIsExporting(true);
    const quarterLabel = getFilteredQuarterLabel();

    // 분기별 데이터만 추출
    const quarterlyData = {
      info: data.info,
      quarter: quarterLabel,
      kpi: kpi,
      tier2KPI: tier2KPI,
      tier3KPI: tier3KPI
    };

    const result = exportToExcel(quarterlyData, `${data.info.name}_${quarterLabel}_분기별결과`);
    setIsExporting(false);
    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  // 기업 데이터가 없으면 에러 메시지 표시
  if (!data) {
    return (
      <div className="main-content">
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h2>❌ 기업을 찾을 수 없습니다</h2>
          <p style={{ color: '#6B7280', margin: '1rem 0 2rem' }}>
            요청하신 기업의 데이터를 찾을 수 없습니다.
          </p>
          {isAdmin && (
            <Link to="/companies" className="btn btn-primary">
              기업 목록으로 돌아가기
            </Link>
          )}
        </div>
      </div>
    );
  }

  const { info, performance, kpi, tier2KPI, tier3KPI, campaigns, cumulative, timeSeries, esgScores, media } = data;

  // 연도/분기 필터링 함수
  const getFilteredQuarterLabel = () => {
    if (selectedYear === 'all' && selectedQuarter === 'all') {
      return '전체 기간';
    } else if (selectedYear === 'all') {
      return `전체 ${selectedQuarter}`;
    } else if (selectedQuarter === 'all') {
      return `${selectedYear}년 전체`;
    } else {
      return `${selectedYear} ${selectedQuarter}`;
    }
  };

  // 선택된 연도/분기에 해당하는 데이터가 있는지 확인
  const hasQuarterlyData = () => {
    if (selectedYear === 'all' || selectedQuarter === 'all') {
      return true; // 전체 선택 시 항상 데이터 있음
    }

    // timeSeries에서 해당 분기 데이터 찾기
    const quarterLabel = `${selectedQuarter}'${selectedYear.slice(2)}`;
    return timeSeries && timeSeries.some(item => item.quarter === quarterLabel);
  };

  const isDataAvailable = hasQuarterlyData();

  // 선택된 분기의 데이터를 가져오는 함수
  const getQuarterlyData = () => {
    if (selectedYear === 'all' || selectedQuarter === 'all') {
      // 전체 기간 선택 시 현재 데이터 반환 (누적 또는 최신)
      return {
        performance,
        kpi,
        tier2KPI,
        tier3KPI
      };
    }

    // 특정 분기 선택 시 해당 분기 데이터 계산
    const quarterLabel = `${selectedQuarter}'${selectedYear.slice(2)}`;
    const quarterData = timeSeries.find(item => item.quarter === quarterLabel);

    if (!quarterData) {
      return null;
    }

    // 분기별 데이터를 기반으로 KPI 재계산
    // 실제로는 분기별 상세 데이터가 있어야 하지만, 여기서는 timeSeries 데이터를 기반으로 비율 계산
    const ratio = quarterData.collection / performance.collectionAmount;

    // 분기별 성과 계산
    const quarterlyPerformance = {
      participants: Math.round(quarterData.participants),
      collectionAmount: quarterData.collection,
      co2Reduction: quarterData.co2,
      jobCreation: Math.round(performance.jobCreation * ratio),
      childrenSupported: Math.round(performance.childrenSupported * ratio),
      participationRate: Math.round((quarterData.participants / performance.participants) * performance.participationRate)
    };

    // 분기별 KPI 계산 (비율 적용)
    const quarterlyKPI = {
      carbonReduction: {
        monthly: quarterData.co2,
        baseline: kpi.carbonReduction.baseline,
        reduction: Math.round((quarterData.co2 / kpi.carbonReduction.monthly) * kpi.carbonReduction.reduction),
        grade: kpi.carbonReduction.grade,
        breakdown: kpi.carbonReduction.breakdown ? {
          plastic: kpi.carbonReduction.breakdown.plastic ? parseFloat((kpi.carbonReduction.breakdown.plastic * ratio).toFixed(2)) : 0,
          toys: kpi.carbonReduction.breakdown.toys ? parseFloat((kpi.carbonReduction.breakdown.toys * ratio).toFixed(2)) : 0,
          total: kpi.carbonReduction.breakdown.total ? parseFloat((kpi.carbonReduction.breakdown.total * ratio).toFixed(2)) : 0
        } : undefined,
        wasteDetail: kpi.carbonReduction.wasteDetail ? {
          plastic: kpi.carbonReduction.wasteDetail.plastic ? {
            total: Math.round(kpi.carbonReduction.wasteDetail.plastic.total * ratio),
            pet: Math.round(kpi.carbonReduction.wasteDetail.plastic.pet * ratio),
            hdpe: Math.round(kpi.carbonReduction.wasteDetail.plastic.hdpe * ratio),
            processing: kpi.carbonReduction.wasteDetail.plastic.processing
          } : undefined,
          toys: kpi.carbonReduction.wasteDetail.toys ? {
            total: Math.round(kpi.carbonReduction.wasteDetail.toys.total * ratio),
            reuse: Math.round(kpi.carbonReduction.wasteDetail.toys.reuse * ratio),
            upcycling: Math.round(kpi.carbonReduction.wasteDetail.toys.upcycling * ratio),
            recycling: Math.round(kpi.carbonReduction.wasteDetail.toys.recycling * ratio)
          } : undefined
        } : undefined
      },
      circularResource: {
        collected: quarterData.collection,
        produced: Math.round(kpi.circularResource.produced * ratio),
        conversionRate: kpi.circularResource.conversionRate,
        grade: kpi.circularResource.grade
      },
      socialImpact: {
        jobs: Math.round(performance.jobCreation * ratio),
        education: Math.round(performance.childrenSupported * ratio),
        monthlyValue: Math.round(kpi.socialImpact.monthlyValue * ratio),
        grade: kpi.socialImpact.grade
      }
    };

    // 분기별 Tier2 KPI 계산
    const quarterlyTier2KPI = tier2KPI && tier2KPI.energySaving && tier2KPI.wasteReduction ? {
      energySaving: tier2KPI.energySaving ? {
        monthlyKWh: Math.round(tier2KPI.energySaving.monthlyKWh * ratio),
        co2Equivalent: parseFloat((tier2KPI.energySaving.co2Equivalent * ratio).toFixed(2)),
        costSaving: Math.round(tier2KPI.energySaving.costSaving * ratio),
        grade: tier2KPI.energySaving.grade
      } : undefined,
      wasteReduction: tier2KPI.wasteReduction ? {
        totalWeight: Math.round(tier2KPI.wasteReduction.totalWeight * ratio),
        monthlyReduction: Math.round(tier2KPI.wasteReduction.monthlyReduction * ratio),
        reductionRate: tier2KPI.wasteReduction.reductionRate,
        breakdown: tier2KPI.wasteReduction.breakdown ? {
          plastic: Math.round(tier2KPI.wasteReduction.breakdown.plastic * ratio),
          paper: Math.round(tier2KPI.wasteReduction.breakdown.paper * ratio),
          etc: Math.round(tier2KPI.wasteReduction.breakdown.etc * ratio)
        } : undefined,
        grade: tier2KPI.wasteReduction.grade
      } : undefined,
      educationReach: tier2KPI.educationReach ? {
        totalReach: Math.round(tier2KPI.educationReach.totalReach * ratio),
        weightedScore: Math.round(tier2KPI.educationReach.weightedScore * ratio),
        breakdown: tier2KPI.educationReach.breakdown ? {
          employees: Math.round(tier2KPI.educationReach.breakdown.employees * ratio),
          partners: Math.round(tier2KPI.educationReach.breakdown.partners * ratio),
          community: Math.round(tier2KPI.educationReach.breakdown.community * ratio)
        } : undefined,
        grade: tier2KPI.educationReach.grade
      } : undefined,
      supplyChainEngagement: tier2KPI.supplyChainEngagement ? {
        totalPartners: tier2KPI.supplyChainEngagement.totalPartners,
        activePartners: Math.round(tier2KPI.supplyChainEngagement.activePartners * ratio),
        engagementRate: Math.round(tier2KPI.supplyChainEngagement.engagementRate * ratio),
        grade: tier2KPI.supplyChainEngagement.grade
      } : undefined,
      upcyclingValue: tier2KPI.upcyclingValue ? {
        rawMaterialValue: Math.round(tier2KPI.upcyclingValue.rawMaterialValue * ratio),
        finalProductValue: Math.round(tier2KPI.upcyclingValue.finalProductValue * ratio),
        valueAddedRate: tier2KPI.upcyclingValue.valueAddedRate,
        breakdown: tier2KPI.upcyclingValue.breakdown ? {
          rawMaterialValue: Math.round(tier2KPI.upcyclingValue.breakdown.rawMaterialValue * ratio),
          finalProductValue: Math.round(tier2KPI.upcyclingValue.breakdown.finalProductValue * ratio)
        } : undefined,
        grade: tier2KPI.upcyclingValue.grade
      } : undefined,
      resourceValue: tier2KPI.resourceValue ? {
        monthlyValue: Math.round(tier2KPI.resourceValue.monthlyValue * ratio),
        unitPrice: tier2KPI.resourceValue.unitPrice,
        collected: Math.round(tier2KPI.resourceValue.collected * ratio),
        breakdown: tier2KPI.resourceValue.breakdown ? {
          plastic: Math.round(tier2KPI.resourceValue.breakdown.plastic * ratio),
          toys: Math.round(tier2KPI.resourceValue.breakdown.toys * ratio)
        } : undefined,
        target: tier2KPI.resourceValue.target,
        grade: tier2KPI.resourceValue.grade
      } : undefined
    } : null;

    // 분기별 ESG 임팩트 스코어 재계산
    // E Score: 탄소 저감 (50점 만점)
    const carbonScore = Math.min(50, Math.round((quarterlyKPI.carbonReduction.monthly / 5.0) * 50));
    const eScore = Math.max(30, carbonScore); // 최소 30점

    // S Score: 사회적 임팩트 (100점 만점)
    const socialValue = quarterlyKPI.socialImpact.monthlyValue || 0;
    const sScore = Math.min(100, Math.max(0, Math.round((socialValue / 2000000) * 100)));

    // G Score: 거버넌스는 동일 (분기별 변동 없음)
    const gScore = tier3KPI ? tier3KPI.gScore : 82;

    // Total Score: E(40%) + S(40%) + G(20%)
    const totalScore = Math.round((eScore * 0.4) + (sScore * 0.4) + (gScore * 0.2));

    let grade = 'C';
    let gradeDescription = '보통';
    if (totalScore >= 90) {
      grade = 'S';
      gradeDescription = '최우수';
    } else if (totalScore >= 80) {
      grade = 'A';
      gradeDescription = '우수';
    } else if (totalScore >= 70) {
      grade = 'B';
      gradeDescription = '양호';
    }

    const quarterlyTier3KPI = {
      eScore,
      sScore,
      gScore,
      totalScore,
      grade,
      gradeDescription
    };

    return {
      performance: quarterlyPerformance,
      kpi: quarterlyKPI,
      tier2KPI: quarterlyTier2KPI,
      tier3KPI: quarterlyTier3KPI
    };
  };

  // 현재 표시할 데이터 결정
  const displayData = getQuarterlyData();

  // 분기별 결과 섹션에서 사용할 데이터 (필터링된 데이터 또는 원본 데이터)
  let quarterlyKPI = displayData?.kpi || kpi;
  let quarterlyTier2KPI = displayData?.tier2KPI || tier2KPI;
  let quarterlyTier3KPI = displayData?.tier3KPI || tier3KPI;

  return (
    <div className="main-content">
      {/* 뒤로가기 버튼 - 관리자만 표시 */}
      {isAdmin && (
        <div style={{ marginBottom: '1rem' }}>
          <Link to="/companies" className="btn btn-outline">
            ← 기업 목록으로 돌아가기
          </Link>
        </div>
      )}

      {/* 기업 헤더 */}
      <div className="section">
        <div className="card" style={{
          background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
          color: 'white'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ fontSize: '4rem' }}>{info.logo}</div>
            <div>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                {info.name}
              </h1>
              <div style={{ fontSize: '1.125rem', opacity: 0.9 }}>
                {info.industry}
              </div>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginTop: '2rem'
          }}>
            <div>
              <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>최초 참여</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                {info.firstParticipation}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>누적 참여</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                {info.totalParticipations}회
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>담당자</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                {info.contact.name}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>ESG 스코어</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                {esgScores.overall}점
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 전체 ESG 성과 요약 */}
      <div className="section">
        <h2 className="section-title">📊 전체 ESG 성과 요약 (누적)</h2>

        {/* ESG 임팩트 스코어 카드 */}
        {tier3KPI && (
          <div className="card" style={{ marginBottom: '2rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.5rem',
              background: tier3KPI.grade === 'S' ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' :
                          tier3KPI.grade === 'A' ? 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)' :
                          'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)',
              borderRadius: '1rem',
              color: 'white',
              marginBottom: '1.5rem'
            }}>
              <div>
                <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.25rem' }}>ESG 임팩트 스코어</div>
                <div style={{ fontSize: '3rem', fontWeight: '700' }}>{tier3KPI.totalScore}점</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  display: 'inline-block',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '0.75rem',
                  backdropFilter: 'blur(10px)'
                }}>
                  <div style={{ fontSize: '2rem', fontWeight: '700' }}>{tier3KPI.grade}</div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>{tier3KPI.gradeDescription}</div>
                </div>
              </div>
            </div>

            {/* E, S, G 비율 간단 표현 */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.5rem' }}>🌍 환경 (E)</div>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: `${esgScores.environmental}%`, backgroundColor: '#10B981' }}>
                    {esgScores.environmental}%
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.5rem' }}>🤝 사회 (S)</div>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: `${esgScores.social}%`, backgroundColor: '#3B82F6' }}>
                    {esgScores.social}%
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.5rem' }}>💼 지배구조 (G)</div>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: `${esgScores.governance}%`, backgroundColor: '#6B7280' }}>
                    {esgScores.governance}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="card-grid">
          <div className="card">
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👥</div>
            <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.25rem' }}>
              참여 임직원
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#374151' }}>
              {performance.participants}명
            </div>
            <div className="badge badge-success" style={{ marginTop: '0.5rem' }}>
              🥇 {performance.ranking.participants}위/12개
            </div>
          </div>

          <div className="card">
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📦</div>
            <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.25rem' }}>
              수거량
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#374151' }}>
              {performance.collectionAmount.toLocaleString()}kg
            </div>
            <div className="badge badge-success" style={{ marginTop: '0.5rem' }}>
              🥇 {performance.ranking.collection}위/12개
            </div>
          </div>

          <div className="card">
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌍</div>
            <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.25rem' }}>
              CO₂ 절감량
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#3B82F6' }}>
              {performance.co2Reduction}톤
            </div>
            <div className="badge badge-success" style={{ marginTop: '0.5rem' }}>
              🥇 {performance.ranking.co2}위/12개
            </div>
          </div>

          <div className="card">
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👴</div>
            <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.25rem' }}>
              일자리 창출
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#374151' }}>
              {performance.jobCreation}명
            </div>
          </div>

          <div className="card">
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎁</div>
            <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.25rem' }}>
              수혜 아동
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#374151' }}>
              {performance.childrenSupported}명
            </div>
          </div>

          <div className="card">
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💰</div>
            <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.25rem' }}>
              기부 금액
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#10B981' }}>
              {((performance.jobCreation || 0) * 50000).toLocaleString()}원
            </div>
          </div>
        </div>
      </div>

      {/* 분기별 결과 */}
      <div className="section" id="quarterly-results-section">
        <h2 className="section-title">📅 분기별 결과 - {getFilteredQuarterLabel()}</h2>
        <p className="section-subtitle">
          선택한 기간의 상세 성과를 확인하세요
        </p>

        {/* 연도 및 분기 선택 */}
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          {/* 연도 선택 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.875rem', color: '#6B7280', fontWeight: '500' }}>연도:</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => setSelectedYear('all')}
                style={{
                  padding: '0.5rem 1rem',
                  border: selectedYear === 'all' ? '2px solid #3B82F6' : '1px solid #D1D5DB',
                  backgroundColor: selectedYear === 'all' ? '#EFF6FF' : 'white',
                  color: selectedYear === 'all' ? '#3B82F6' : '#6B7280',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: selectedYear === 'all' ? '600' : '500',
                  transition: 'all 0.2s'
                }}
              >
                전체
              </button>
              <button
                onClick={() => setSelectedYear('2024')}
                style={{
                  padding: '0.5rem 1rem',
                  border: selectedYear === '2024' ? '2px solid #3B82F6' : '1px solid #D1D5DB',
                  backgroundColor: selectedYear === '2024' ? '#EFF6FF' : 'white',
                  color: selectedYear === '2024' ? '#3B82F6' : '#6B7280',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: selectedYear === '2024' ? '600' : '500',
                  transition: 'all 0.2s'
                }}
              >
                2024
              </button>
              <button
                onClick={() => setSelectedYear('2025')}
                style={{
                  padding: '0.5rem 1rem',
                  border: selectedYear === '2025' ? '2px solid #3B82F6' : '1px solid #D1D5DB',
                  backgroundColor: selectedYear === '2025' ? '#EFF6FF' : 'white',
                  color: selectedYear === '2025' ? '#3B82F6' : '#6B7280',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: selectedYear === '2025' ? '600' : '500',
                  transition: 'all 0.2s'
                }}
              >
                2025
              </button>
            </div>
          </div>

          {/* 분기 선택 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.875rem', color: '#6B7280', fontWeight: '500' }}>분기:</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => setSelectedQuarter('all')}
                style={{
                  padding: '0.5rem 1rem',
                  border: selectedQuarter === 'all' ? '2px solid #10B981' : '1px solid #D1D5DB',
                  backgroundColor: selectedQuarter === 'all' ? '#D1FAE5' : 'white',
                  color: selectedQuarter === 'all' ? '#059669' : '#6B7280',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: selectedQuarter === 'all' ? '600' : '500',
                  transition: 'all 0.2s'
                }}
              >
                전체
              </button>
              {['Q1', 'Q2', 'Q3', 'Q4'].map(quarter => (
                <button
                  key={quarter}
                  onClick={() => setSelectedQuarter(quarter)}
                  style={{
                    padding: '0.5rem 1rem',
                    border: selectedQuarter === quarter ? '2px solid #10B981' : '1px solid #D1D5DB',
                    backgroundColor: selectedQuarter === quarter ? '#D1FAE5' : 'white',
                    color: selectedQuarter === quarter ? '#059669' : '#6B7280',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: selectedQuarter === quarter ? '600' : '500',
                    transition: 'all 0.2s'
                  }}
                >
                  {quarter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 분기별 ESG 임팩트 스코어 */}
        {quarterlyTier3KPI && (
          <div className="card" style={{ marginBottom: '2rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.5rem',
              background: quarterlyTier3KPI.grade === 'S' ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' :
                          quarterlyTier3KPI.grade === 'A' ? 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)' :
                          'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)',
              borderRadius: '0.75rem',
              color: 'white'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', opacity: 0.9, marginBottom: '0.25rem' }}>분기별 ESG 임팩트 스코어</div>
                <div style={{ fontSize: '2.5rem', fontWeight: '700' }}>{quarterlyTier3KPI.totalScore}점</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  display: 'inline-block',
                  padding: '0.5rem 1rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '0.5rem',
                  backdropFilter: 'blur(10px)'
                }}>
                  <div style={{ fontSize: '2rem', fontWeight: '700' }}>{quarterlyTier3KPI.grade}</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>{quarterlyTier3KPI.gradeDescription}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 분기별 다운로드 버튼 */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          <button
            className="btn btn-outline"
            onClick={handleQuarterlyPDFExport}
            disabled={isExporting}
            style={{ flex: '1', minWidth: '120px' }}
          >
            📄 PDF 다운로드
          </button>
          <button
            className="btn btn-outline"
            onClick={handleQuarterlyPNGExport}
            disabled={isExporting}
            style={{ flex: '1', minWidth: '120px' }}
          >
            🖼️ PNG 다운로드
          </button>
          <button
            className="btn btn-outline"
            onClick={handleQuarterlyExcelExport}
            disabled={isExporting}
            style={{ flex: '1', minWidth: '120px' }}
          >
            📊 Excel 다운로드
          </button>
        </div>

        {/* 데이터 없음 메시지 */}
        {!isDataAvailable ? (
          <div className="card" style={{
            padding: '3rem',
            textAlign: 'center',
            backgroundColor: '#F9FAFB',
            border: '2px dashed #D1D5DB'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
            <h3 style={{ fontSize: '1.5rem', color: '#374151', marginBottom: '0.5rem' }}>
              해당 분기 데이터가 없습니다
            </h3>
            <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>
              {getFilteredQuarterLabel()}에 대한 데이터가 아직 등록되지 않았습니다.
            </p>
          </div>
        ) : (
          <>
        {/* KPI #1: 탄소 저감 기여도 - 상세 정보 */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ fontSize: '2.5rem' }}>🌍</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
                    탄소 저감 기여도
                  </h3>
                  <button
                    onClick={() => toggleTooltip('carbon')}
                    style={{
                      background: '#10B981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                    title="자세히 보기"
                  >
                    ?
                  </button>
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                  폐기물 순환을 통한 CO₂ 절감 효과
                </div>
                {activeTooltip === 'carbon' && (
                  <div style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    backgroundColor: '#F0FDF4',
                    borderRadius: '0.5rem',
                    borderLeft: '4px solid #10B981',
                    fontSize: '0.875rem',
                    lineHeight: '1.6',
                    color: '#065F46'
                  }}>
                    <strong>📊 탄소 저감 기여도란?</strong><br/>
                    폐플라스틱과 장난감을 수거하여 업사이클링하는 과정에서 발생하는 CO₂ 절감량을 측정합니다.
                    신규 원자재 생산 대비 얼마나 많은 탄소 배출을 줄였는지를 계산하여 환경(E) 성과로 평가합니다.
                    <br/><br/>
                    <strong>계산 방식:</strong> 수거량(kg) × 원자재별 CO₂ 환산계수
                  </div>
                )}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.25rem' }}>
                총 CO₂ 저감량
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#10B981' }}>
                {quarterlyKPI.carbonReduction.monthly} tonnes
              </div>
              <div className={`badge badge-${quarterlyKPI.carbonReduction.grade === '우수' ? 'success' : quarterlyKPI.carbonReduction.grade === '양호' ? 'info' : 'warning'}`} style={{ marginTop: '0.5rem' }}>
                {quarterlyKPI.carbonReduction.grade}
              </div>
            </div>
          </div>

          {/* 목표 달성률 */}
          {quarterlyKPI.carbonReduction.achieved && (
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>목표 달성률</span>
              <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                {quarterlyKPI.carbonReduction.achieved}% (목표 {quarterlyKPI.carbonReduction.target} tonnes)
              </span>
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${Math.min(quarterlyKPI.carbonReduction.achieved, 100)}%` }}>
                {quarterlyKPI.carbonReduction.achieved}%
              </div>
            </div>
          </div>
          )}

          {/* CO₂ 저감 기여도 분석 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {/* 폐플라스틱 섬유 업사이클링 */}
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#F0FDF4',
              borderRadius: '0.75rem',
              borderLeft: '4px solid #10B981'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.5rem' }}>🧶</span>
                <h4 style={{ fontSize: '1.125rem', fontWeight: '600' }}>폐플라스틱 섬유 업사이클링</h4>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10B981' }}>
                  {quarterlyKPI.carbonReduction.breakdown.plastic} tonnes CO₂
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '0.25rem' }}>
                  총 {quarterlyKPI.carbonReduction.wasteDetail.plastic.total}kg 수거
                </div>
              </div>

              <div style={{ fontSize: '0.875rem', color: '#374151', lineHeight: '1.6' }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>• PET 병:</strong> {quarterlyKPI.carbonReduction.wasteDetail.plastic.pet}kg
                  <span style={{ color: '#6B7280' }}> (2.29 × 2.5 UF)</span>
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>• HDPE 용기:</strong> {quarterlyKPI.carbonReduction.wasteDetail.plastic.hdpe}kg
                  <span style={{ color: '#6B7280' }}> (3.12 × 2.5 UF)</span>
                </div>
                <div style={{
                  marginTop: '1rem',
                  padding: '0.75rem',
                  backgroundColor: 'white',
                  borderRadius: '0.5rem',
                  fontSize: '0.8125rem'
                }}>
                  <strong>📦 제작 제품:</strong> {quarterlyKPI.carbonReduction.wasteDetail.plastic.processing}
                </div>
              </div>
            </div>

            {/* 장난감 순환 경로 */}
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#F9FAFB',
              borderRadius: '0.75rem',
              borderLeft: '4px solid #6B7280'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.5rem' }}>🧸</span>
                <h4 style={{ fontSize: '1.125rem', fontWeight: '600' }}>장난감 순환 경로</h4>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#6B7280' }}>
                  {quarterlyKPI.carbonReduction.breakdown.toys} tonnes CO₂
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '0.25rem' }}>
                  총 {quarterlyKPI.carbonReduction.wasteDetail.toys.total}kg 수거
                </div>
              </div>

              <div style={{ fontSize: '0.875rem', color: '#374151', lineHeight: '1.6' }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>• 재사용:</strong> {quarterlyKPI.carbonReduction.wasteDetail.toys.reuse}kg
                  <span style={{ color: '#6B7280' }}> (2.75 × 3.0 RBF)</span>
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>• 업사이클링:</strong> {quarterlyKPI.carbonReduction.wasteDetail.toys.upcycling}kg
                  <span style={{ color: '#6B7280' }}> (2.75 × 2.5 UF)</span>
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>• 재활용:</strong> {quarterlyKPI.carbonReduction.wasteDetail.toys.recycling}kg
                  <span style={{ color: '#6B7280' }}> (2.75 × 1.0)</span>
                </div>
                <div style={{
                  marginTop: '1rem',
                  padding: '0.75rem',
                  backgroundColor: 'white',
                  borderRadius: '0.5rem',
                  fontSize: '0.8125rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.5rem',
                  textAlign: 'center'
                }}>
                  <div>
                    <div style={{ fontWeight: '600', color: '#10B981' }}>
                      {Math.round(quarterlyKPI.carbonReduction.wasteDetail.toys.reuse / quarterlyKPI.carbonReduction.wasteDetail.toys.total * 100)}%
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>재사용</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#3B82F6' }}>
                      {Math.round(quarterlyKPI.carbonReduction.wasteDetail.toys.upcycling / quarterlyKPI.carbonReduction.wasteDetail.toys.total * 100)}%
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>업사이클</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#6B7280' }}>
                      {Math.round(quarterlyKPI.carbonReduction.wasteDetail.toys.recycling / quarterlyKPI.carbonReduction.wasteDetail.toys.total * 100)}%
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>재활용</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 환산 지표 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            padding: '1.5rem',
            backgroundColor: '#F9FAFB',
            borderRadius: '0.5rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🌲</div>
              <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#10B981' }}>
                {Math.round(quarterlyKPI.carbonReduction.monthly * 1000 / 22)}그루
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.25rem' }}>
                소나무 1년 흡수량
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🚗</div>
              <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#10B981' }}>
                {(quarterlyKPI.carbonReduction.monthly / 4.6).toFixed(1)}대
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.25rem' }}>
                승용차 1년 운행 중단
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🧊</div>
              <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#10B981' }}>
                {Math.round(quarterlyKPI.carbonReduction.monthly * 1000 * 0.00744)}m²
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.25rem' }}>
                북극 빙하 보존
              </div>
            </div>
          </div>
        </div>

        {/* KPI #2, #3 */}
        <div className="card-grid">

          {/* KPI #2: 순환 자원 */}
          <div className="card">
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>♻️</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', margin: 0 }}>
                순환 자원 기여도
              </h3>
              <button
                onClick={() => toggleTooltip('circular')}
                style={{
                  background: '#10B981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
                title="자세히 보기"
              >
                ?
              </button>
            </div>
            {activeTooltip === 'circular' && (
              <div style={{
                marginBottom: '1rem',
                padding: '0.75rem',
                backgroundColor: '#F0FDF4',
                borderRadius: '0.5rem',
                borderLeft: '3px solid #10B981',
                fontSize: '0.75rem',
                lineHeight: '1.5',
                color: '#065F46'
              }}>
                <strong>♻️ 순환 자원 기여도란?</strong><br/>
                수거한 폐자원이 업사이클링 제품으로 전환된 비율입니다.
                순환경제 실현 정도를 나타내는 핵심 지표입니다.
              </div>
            )}
            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#374151', marginBottom: '0.5rem' }}>
              {quarterlyKPI.circularResource.conversionRate}%
            </div>
            <div style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '0.5rem' }}>
              수거 {quarterlyKPI.circularResource.collected}kg → 제품 {quarterlyKPI.circularResource.produced}kg
            </div>
            <div style={{ marginTop: '1rem' }}>
              <div className="badge badge-success">
                {quarterlyKPI.circularResource.grade}
              </div>
            </div>
          </div>

          {/* KPI #3: 사회적 임팩트 */}
          <div className="card">
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🤝</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', margin: 0 }}>
                사회적 임팩트 지수
              </h3>
              <button
                onClick={() => toggleTooltip('social')}
                style={{
                  background: '#10B981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
                title="자세히 보기"
              >
                ?
              </button>
            </div>
            {activeTooltip === 'social' && (
              <div style={{
                marginBottom: '1rem',
                padding: '0.75rem',
                backgroundColor: '#F0FDF4',
                borderRadius: '0.5rem',
                borderLeft: '3px solid #10B981',
                fontSize: '0.75rem',
                lineHeight: '1.5',
                color: '#065F46'
              }}>
                <strong>🤝 사회적 임팩트 지수란?</strong><br/>
                노인 일자리 창출, 취약계층 교육 등 사회적 가치를 화폐 단위로 환산한 지표입니다.
                사회(S) 성과를 정량적으로 측정합니다.
              </div>
            )}
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#374151', marginBottom: '0.5rem' }}>
              {(quarterlyKPI.socialImpact.monthlyValue / 10000).toLocaleString()}만원
            </div>
            <div style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '0.5rem' }}>
              일자리 {quarterlyKPI.socialImpact.jobs}명 / 교육 {quarterlyKPI.socialImpact.education}명
            </div>
            <div style={{ marginTop: '1rem' }}>
              <div className="badge badge-success">
                {quarterlyKPI.socialImpact.grade}
              </div>
            </div>
          </div>
        </div>

        {/* Tier 2 보조 KPI 토글 */}
        {quarterlyTier2KPI && (
          <>
            <div style={{ marginTop: '2rem', marginBottom: '1rem' }}>
              <button
                onClick={() => setIsTier2Collapsed(!isTier2Collapsed)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  backgroundColor: '#F9FAFB',
                  border: '1px solid #E5E7EB',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#374151',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
              >
                <span>📊 보조 KPI 상세 보기 (5개 지표)</span>
                <span style={{ fontSize: '1.25rem' }}>{isTier2Collapsed ? '▼' : '▲'}</span>
              </button>
            </div>

            {!isTier2Collapsed && tier2KPI && (
              <div style={{ marginTop: '1rem' }}>
                <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '1.5rem' }}>
                  분기별 측정 지표로 상세 분석 및 ESG 평가 대응에 활용됩니다.
                </p>

          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ fontSize: '2.5rem' }}>⚡</div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
                      에너지 절감 효과 (E)
                    </h3>
                    <button
                      onClick={() => toggleTooltip('tier2-energy')}
                      style={{
                        background: '#10B981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}
                      title="자세히 보기"
                    >
                      ?
                    </button>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                    제품 생산 과정에서 절감되는 에너지량
                  </div>
                  {activeTooltip === 'tier2-energy' && (
                    <div style={{
                      marginTop: '1rem',
                      padding: '1rem',
                      backgroundColor: '#F0FDF4',
                      borderRadius: '0.5rem',
                      borderLeft: '4px solid #10B981',
                      fontSize: '0.875rem',
                      lineHeight: '1.6',
                      color: '#065F46'
                    }}>
                      <strong>⚡ 에너지 절감 효과란?</strong><br/>
                      업사이클링 과정에서 신규 원자재 생산 대비 절감되는 전력량(kWh)을 측정합니다.
                      재활용을 통해 제조업 에너지 소비를 줄이는 환경(E) 성과 지표입니다.
                      <br/><br/>
                      <strong>환산 기준:</strong> 원자재별 생산 에너지 차이 × 수거량
                    </div>
                  )}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.25rem' }}>
                  월 절감량
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#374151' }}>
                  {quarterlyTier2KPI.energySaving.monthly.toLocaleString()} kWh
                </div>
                <div className={`badge badge-${quarterlyTier2KPI.energySaving.grade === '우수' ? 'success' : 'info'}`} style={{ marginTop: '0.5rem' }}>
                  {quarterlyTier2KPI.energySaving.grade}
                </div>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{ padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem' }}>
                <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>PET 병</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#374151' }}>
                  {quarterlyTier2KPI.energySaving.breakdown.pet.toLocaleString()} kWh
                </div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem' }}>
                <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>HDPE 용기</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#374151' }}>
                  {quarterlyTier2KPI.energySaving.breakdown.hdpe.toLocaleString()} kWh
                </div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem' }}>
                <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>혼합 플라스틱</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#374151' }}>
                  {quarterlyTier2KPI.energySaving.breakdown.mixedPlastic.toLocaleString()} kWh
                </div>
              </div>
            </div>

          </div>

          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ fontSize: '2.5rem' }}>🤝</div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
                      협력 네트워크 확장도 (S)
                    </h3>
                    <button
                      onClick={() => toggleTooltip('tier2-network')}
                      style={{
                        background: '#10B981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}
                      title="자세히 보기"
                    >
                      ?
                    </button>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                    최근 3개월 내 활동 협력 기관 수
                  </div>
                  {activeTooltip === 'tier2-network' && (
                    <div style={{
                      marginTop: '1rem',
                      padding: '1rem',
                      backgroundColor: '#F0FDF4',
                      borderRadius: '0.5rem',
                      borderLeft: '4px solid #10B981',
                      fontSize: '0.875rem',
                      lineHeight: '1.6',
                      color: '#065F46'
                    }}>
                      <strong>🤝 협력 네트워크 확장도란?</strong><br/>
                      사회적기업, 복지기관, 교육기관 등과의 협력 규모를 측정합니다.
                      지역사회와의 연계 강화를 나타내는 사회(S) 성과 지표입니다.
                      <br/><br/>
                      <strong>평가 기준:</strong> 최근 3개월 내 실제 활동한 협력 기관 수
                    </div>
                  )}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.25rem' }}>
                  활동 협력기관
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#3B82F6' }}>
                  {quarterlyTier2KPI.partnerNetwork.activePartners}개
                </div>
                <div className={`badge badge-${quarterlyTier2KPI.partnerNetwork.grade === '우수' ? 'success' : 'info'}`} style={{ marginTop: '0.5rem' }}>
                  {quarterlyTier2KPI.partnerNetwork.grade}
                </div>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{ padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#374151' }}>
                  {quarterlyTier2KPI.partnerNetwork.breakdown.corporate}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>민간 기업</div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#374151' }}>
                  {quarterlyTier2KPI.partnerNetwork.breakdown.public}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>공공기관</div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#374151' }}>
                  {quarterlyTier2KPI.partnerNetwork.breakdown.education}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>교육기관</div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#374151' }}>
                  {quarterlyTier2KPI.partnerNetwork.breakdown.npo}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>비영리단체</div>
              </div>
            </div>

          </div>

          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ fontSize: '2.5rem' }}>💰</div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
                      자원 가치 보존액 (G)
                    </h3>
                    <button
                      onClick={() => toggleTooltip('tier2-value')}
                      style={{
                        background: '#10B981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}
                      title="자세히 보기"
                    >
                      ?
                    </button>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                    순환 자원으로 전환된 경제적 가치
                  </div>
                  {activeTooltip === 'tier2-value' && (
                    <div style={{
                      marginTop: '1rem',
                      padding: '1rem',
                      backgroundColor: '#F0FDF4',
                      borderRadius: '0.5rem',
                      borderLeft: '4px solid #10B981',
                      fontSize: '0.875rem',
                      lineHeight: '1.6',
                      color: '#065F46'
                    }}>
                      <strong>💰 자원 가치 보존액이란?</strong><br/>
                      폐기되었을 자원을 재활용/업사이클링하여 보존한 경제적 가치를 화폐로 환산한 지표입니다.
                      순환경제 기여도를 나타내는 지배구조(G) 성과입니다.
                      <br/><br/>
                      <strong>계산 방식:</strong> 재자원화 제품 판매가 + 원자재 대체 가치
                    </div>
                  )}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.25rem' }}>
                  월 보존액
                </div>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#6B7280' }}>
                  {(quarterlyTier2KPI.resourceValue.monthlyValue / 10000).toLocaleString()}만원
                </div>
                <div className={`badge badge-${quarterlyTier2KPI.resourceValue.grade === '우수' ? 'success' : 'warning'}`} style={{ marginTop: '0.5rem' }}>
                  {quarterlyTier2KPI.resourceValue.grade}
                </div>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{ padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem' }}>
                <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>플라스틱 재자원화</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#374151' }}>
                  {(quarterlyTier2KPI.resourceValue.breakdown.plastic / 10000).toLocaleString()}만원
                </div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem' }}>
                <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>장난감 재사용</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#374151' }}>
                  {(quarterlyTier2KPI.resourceValue.breakdown.toys / 10000).toLocaleString()}만원
                </div>
              </div>
            </div>

          </div>

          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ fontSize: '2.5rem' }}>📚</div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
                      교육 도달 범위 (S)
                    </h3>
                    <button
                      onClick={() => toggleTooltip('tier2-education')}
                      style={{
                        background: '#10B981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}
                      title="자세히 보기"
                    >
                      ?
                    </button>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                    교육 프로그램 참여 인원 가중 점수
                  </div>
                  {activeTooltip === 'tier2-education' && (
                    <div style={{
                      marginTop: '1rem',
                      padding: '1rem',
                      backgroundColor: '#F0FDF4',
                      borderRadius: '0.5rem',
                      borderLeft: '4px solid #10B981',
                      fontSize: '0.875rem',
                      lineHeight: '1.6',
                      color: '#065F46'
                    }}>
                      <strong>📚 교육 도달 범위란?</strong><br/>
                      ESG 교육 프로그램의 참여 인원을 대상별 중요도로 가중하여 계산한 지표입니다.
                      지역사회 확산 노력을 나타내는 사회(S) 성과입니다.
                      <br/><br/>
                      <strong>가중치:</strong> 임직원(×1.0), 협력사(×1.5), 지역사회(×2.0)
                    </div>
                  )}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.25rem' }}>
                  가중 점수
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#3B82F6' }}>
                  {quarterlyTier2KPI.educationReach.totalScore}점
                </div>
                <div className={`badge badge-${quarterlyTier2KPI.educationReach.grade === '우수' ? 'success' : 'info'}`} style={{ marginTop: '0.5rem' }}>
                  {quarterlyTier2KPI.educationReach.grade}
                </div>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{ padding: '1rem', backgroundColor: '#EFF6FF', borderRadius: '0.5rem' }}>
                <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>임직원</div>
                <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#3B82F6' }}>
                  {quarterlyTier2KPI.educationReach.breakdown.employees}명
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>× 1.0배</div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#EFF6FF', borderRadius: '0.5rem' }}>
                <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>협력사</div>
                <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#3B82F6' }}>
                  {quarterlyTier2KPI.educationReach.breakdown.partners}명
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>× 1.5배</div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#EFF6FF', borderRadius: '0.5rem' }}>
                <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>지역사회</div>
                <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#3B82F6' }}>
                  {quarterlyTier2KPI.educationReach.breakdown.community}명
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>× 2.0배</div>
              </div>
            </div>

          </div>

          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ fontSize: '2.5rem' }}>🔄</div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
                      업사이클링 부가가치율 (G)
                    </h3>
                    <button
                      onClick={() => toggleTooltip('tier2-upcycling')}
                      style={{
                        background: '#10B981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}
                      title="자세히 보기"
                    >
                      ?
                    </button>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                    원재료 대비 최종 제품 가치 상승률
                  </div>
                  {activeTooltip === 'tier2-upcycling' && (
                    <div style={{
                      marginTop: '1rem',
                      padding: '1rem',
                      backgroundColor: '#F0FDF4',
                      borderRadius: '0.5rem',
                      borderLeft: '4px solid #10B981',
                      fontSize: '0.875rem',
                      lineHeight: '1.6',
                      color: '#065F46'
                    }}>
                      <strong>🔄 업사이클링 부가가치율이란?</strong><br/>
                      폐자원(원재료)을 업사이클링하여 만든 최종 제품의 가치 상승률을 나타냅니다.
                      단순 재활용을 넘어 혁신적 가치 창출을 평가하는 지배구조(G) 지표입니다.
                      <br/><br/>
                      <strong>계산 방식:</strong> (최종 제품 가치 - 원재료 가치) / 원재료 가치 × 100
                    </div>
                  )}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.25rem' }}>
                  부가가치율
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#6B7280' }}>
                  {quarterlyTier2KPI.upcyclingValue.valueAddedRate}%
                </div>
                <div className={`badge badge-${quarterlyTier2KPI.upcyclingValue.grade === '우수' ? 'success' : 'warning'}`} style={{ marginTop: '0.5rem' }}>
                  {quarterlyTier2KPI.upcyclingValue.grade}
                </div>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{ padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem' }}>
                <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>원재료 가치</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#6B7280' }}>
                  {(quarterlyTier2KPI.upcyclingValue.breakdown.rawMaterialValue / 10000).toLocaleString()}만원
                </div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem' }}>
                <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>최종 제품 가치</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#6B7280' }}>
                  {(tier2KPI.upcyclingValue.breakdown.finalProductValue / 10000).toLocaleString()}만원
                </div>
              </div>
            </div>

          </div>
              </div>
            )}
          </>
        )}
          </>
        )}
      </div>

      {/* 참여 캠페인 내역 */}
      <div className="section">
        <h2 className="section-title">📅 참여 캠페인 내역</h2>
        <div className="card-grid">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="card">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#10B981' }}>
                {campaign.name}
              </h3>
              <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '1rem' }}>
                {campaign.period}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>참여자</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>{campaign.participants}명</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>수거량</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>{campaign.collectionAmount}kg</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>CO₂</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>{campaign.co2Reduction}톤</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 누적 성과 (전체 기간) */}
      <div className="section">
        <h2 className="section-title">📊 누적 성과 (전체 기간)</h2>
        <div className="card">
          <div className="card-grid">
            <div>
              <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.5rem' }}>
                총 참여 횟수
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#10B981' }}>
                {cumulative.totalParticipations}회
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.5rem' }}>
                총 참여 인원
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#10B981' }}>
                {cumulative.totalParticipants.toLocaleString()}명
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.5rem' }}>
                총 수거량
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#10B981' }}>
                {cumulative.totalCollection.toLocaleString()}kg
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.5rem' }}>
                총 CO₂ 절감
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#10B981' }}>
                {cumulative.totalCO2Reduction}톤
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.5rem' }}>
                총 일자리 창출
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#3B82F6' }}>
                {cumulative.totalJobCreation}시간
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.5rem' }}>
                누적 지원 금액
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#F59E0B' }}>
                {(cumulative.totalFunding / 10000).toLocaleString()}만원
              </div>
            </div>
          </div>

          {timeSeries && timeSeries.length > 0 && (
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>📈 분기별 추이</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timeSeries}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="collection" stroke="#10B981" strokeWidth={2} name="수거량 (kg)" />
                  <Line type="monotone" dataKey="participants" stroke="#3B82F6" strokeWidth={2} name="참여자 (명)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* 관련 언론 보도 */}
      {media && media.length > 0 && (
        <div className="section">
          <h2 className="section-title">📰 관련 언론 보도</h2>
          <div className="card">
            {media.map((report) => (
              <div
                key={report.id}
                style={{
                  padding: '1.5rem',
                  borderBottom: '1px solid #E5E7EB'
                }}
              >
                <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                  {report.title}
                </h3>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: '#6B7280' }}>
                  <span>{report.source}</span>
                  <span>|</span>
                  <span>{report.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 데이터 내보내기 */}
      <div className="section">
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem' }}>📥 데이터 내보내기</h3>
          <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>
            {info.name}의 성과 데이터를 다양한 형식으로 다운로드하여 활용하세요
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              className="btn btn-primary"
              onClick={handleExcelExport}
              disabled={isExporting}
            >
              {isExporting ? '⏳ 처리중...' : '📊 Excel 다운로드'}
            </button>
            <button
              className="btn btn-secondary"
              onClick={handlePDFExport}
              disabled={isExporting}
            >
              {isExporting ? '⏳ 처리중...' : '📄 PDF 리포트'}
            </button>
            <button
              className="btn btn-outline"
              onClick={handlePNGExport}
              disabled={isExporting}
            >
              {isExporting ? '⏳ 처리중...' : '🖼️ PNG 저장'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetail;
