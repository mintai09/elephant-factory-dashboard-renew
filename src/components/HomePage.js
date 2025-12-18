import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCompaniesSummary, companiesPerformance } from '../data/companiesData';

function HomePage() {
  const companies = getAllCompaniesSummary();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroImages = [
    `${process.env.PUBLIC_URL}/home_1.jpg`,
    `${process.env.PUBLIC_URL}/home_2.jpg`,
    `${process.env.PUBLIC_URL}/home_3.jpg`
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Calculate real totals from companiesData.js
  const totalParticipants = Object.values(companiesPerformance).reduce((sum, c) => sum + c.participants, 0);
  const totalCollection = Object.values(companiesPerformance).reduce((sum, c) => sum + c.collectionAmount, 0);
  const totalCO2 = Object.values(companiesPerformance).reduce((sum, c) => sum + c.co2Reduction, 0);
  const totalJobCreation = Object.values(companiesPerformance).reduce((sum, c) => sum + (c.jobCreation || 0), 0);
  const totalChildren = Object.values(companiesPerformance).reduce((sum, c) => sum + (c.childrenSupported || 0), 0);
  const plasticTotal = Object.values(companiesPerformance).reduce((sum, c) => sum + c.wasteBreakdown.plastic, 0);
  const toysTotal = Object.values(companiesPerformance).reduce((sum, c) => sum + c.wasteBreakdown.toys, 0);

  // Calculate environmental conversions
  const conversions = {
    trees: Math.round(totalCO2 * 1000 / 22),
    cars: (totalCO2 / 4.6).toFixed(1),
    arcticIce: Math.round(totalCO2 * 1000 * 0.00744)
  };

  // Calculate average recycling rate (circular resource conversion)
  const avgRecyclingRate = companies.reduce((sum, c) => sum + c.kpi.circularResource.conversionRate, 0) / companies.length;

  // Calculate average participation rate
  const avgParticipationRate = companies.reduce((sum, c) => sum + c.performance.participationRate, 0) / companies.length;

  // Calculate ESG Impact Score (Tier 3)
  const avgEScore = companies.reduce((sum, c) => sum + (c.kpi.eScore || 85), 0) / companies.length;
  const avgSScore = companies.reduce((sum, c) => sum + (c.kpi.sScore || 92), 0) / companies.length;
  const avgGScore = companies.reduce((sum, c) => sum + (c.kpi.gScore || 78), 0) / companies.length;
  const esgImpactScore = (avgEScore * 0.5 + avgSScore * 0.3 + avgGScore * 0.2).toFixed(1);
  const esgGrade = esgImpactScore >= 80 ? 'S' : esgImpactScore >= 60 ? 'A' : esgImpactScore >= 40 ? 'B' : 'C';

  return (
    <div>
      {/* 히어로 섹션 */}
      <section className="hero-section" style={{
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Images with Fade Animation */}
        {heroImages.map((image, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: currentImageIndex === index ? 1 : 0,
              transition: 'opacity 1.5s ease-in-out',
              zIndex: 0
            }}
          />
        ))}
        {/* Content Overlay */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          padding: '4rem 2rem',
          width: '100%',
          height: '100%'
        }}>
        <h1 className="hero-title">
          데이터 기반 책임 경영으로 측정 가능한 임팩트 창출
        </h1>
        <p className="hero-subtitle">
          KCGS, MSCI, GRI 등 공식 ESG 평가 기준에 자동 매핑되는 코끼리공장 대시보드를 제공합니다.
        </p>

        {/* 실시간 성과 카운터 */}
        <div className="hero-stats">
          <div className="hero-stat-card">
            <div className="hero-stat-icon">👥</div>
            <div className="hero-stat-value">
              {totalParticipants.toLocaleString()}명
            </div>
            <div className="hero-stat-label">참여 임직원</div>
            <div className="hero-stat-growth">Q1 2025 실적</div>
          </div>

          <div className="hero-stat-card">
            <div className="hero-stat-icon">📦</div>
            <div className="hero-stat-value">
              {totalCollection.toLocaleString()}kg
            </div>
            <div className="hero-stat-label">총 수거량</div>
            <div className="hero-stat-growth">플라스틱 {plasticTotal}kg + 장난감 {toysTotal}kg</div>
          </div>

          <div className="hero-stat-card">
            <div className="hero-stat-icon">🌍</div>
            <div className="hero-stat-value">
              {totalCO2.toFixed(2)}톤
            </div>
            <div className="hero-stat-label">CO₂ 절감량</div>
            <div className="hero-stat-growth">kg당 평균 {(totalCO2 * 1000 / totalCollection).toFixed(2)}kg CO₂</div>
          </div>

          <div className="hero-stat-card">
            <div className="hero-stat-icon">👴</div>
            <div className="hero-stat-value">
              {totalJobCreation.toLocaleString()}명
            </div>
            <div className="hero-stat-label">노인 일자리</div>
            <div className="hero-stat-growth">아동 혜택 {totalChildren}명</div>
          </div>
        </div>

        <div style={{ marginTop: '2rem', fontSize: '1.125rem', opacity: 0.95 }}>
          💡 이는 소나무 {conversions.trees.toLocaleString()}그루를 심은 효과와 같습니다
        </div>

        {/* Primary CTA - 데모 요청 버튼 */}
        <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            </div>
            <p style={{ fontSize: '0.875rem', marginTop: '2rem', opacity: 0.85 }}>
              💡 문의사항이 있으시면 언제든지 연락주세요. 맞춤형 ESG 솔루션을 제안해 드립니다.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;

