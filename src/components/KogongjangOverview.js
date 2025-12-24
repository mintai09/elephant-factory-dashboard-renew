import React from 'react';
import { Link } from 'react-router-dom';
import { companies } from '../data/companiesData';

function KogongjangOverview() {
  // 실제 파트너 기업 수
  const partnerCount = companies.length;

  return (
    <div>
      {/* 히어로 섹션 */}
      <div style={{
        position: 'relative',
        backgroundImage: 'url(./sub_header_01_01.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '0'
      }}>
        {/* Dark overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1
        }}></div>

        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          color: 'white',
          textAlign: 'center',
          padding: '3rem 2rem'
        }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: '700' }}>
            🐘 코끼리공장이 하는 일
          </h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.95, marginBottom: '1rem', lineHeight: '1.8' }}>
            버려지는 장난감을 다시 사회의 자원으로 순환시킵니다
          </p>
          <p style={{ fontSize: '1.125rem', opacity: 0.95, marginTop: '1.5rem', lineHeight: '1.8' }}>
            코끼리공장은 더 이상 사용되지 않는 장난감과 폐플라스틱을<br/>
            나눔 · 교육 · 재생소재 생산으로 연결하는 순환 플랫폼입니다.<br/>
            <strong>아이의 웃음, 환경 보호, 그리고 지역 일자리를 하나의 흐름으로 만듭니다.</strong>
          </p>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="main-content">
        {/* 1. 사회적 성과 */}
        <section className="section">
          <h2 className="section-title">📊 OUR SOCIAL IMPACT</h2>
          <p className="section-subtitle">
            코끼리공장이 만들어낸 사회적 성과
          </p>

          <div className="card" style={{
            background: 'linear-gradient(135deg, #F0FDF4 0%, #D1FAE5 100%)',
            padding: '2.5rem',
            marginBottom: '2rem'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '2rem', color: '#065F46', textAlign: 'center' }}>
              지금까지 코끼리공장이 함께 만든 변화입니다
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#10B981', marginBottom: '0.5rem' }}>
                  168톤
                </div>
                <div style={{ fontSize: '1rem', color: '#065F46', fontWeight: '600' }}>장난감 기부량</div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#10B981', marginBottom: '0.5rem' }}>
                  471만개
                </div>
                <div style={{ fontSize: '1rem', color: '#065F46', fontWeight: '600' }}>장난감 나눔 개수</div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#10B981', marginBottom: '0.5rem' }}>
                  2,914명
                </div>
                <div style={{ fontSize: '1rem', color: '#065F46', fontWeight: '600' }}>자원봉사자 수</div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#10B981', marginBottom: '0.5rem' }}>
                  1.5만명
                </div>
                <div style={{ fontSize: '1rem', color: '#065F46', fontWeight: '600' }}>환경교육 참가자 수</div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#10B981', marginBottom: '0.5rem' }}>
                  707톤
                </div>
                <div style={{ fontSize: '1rem', color: '#065F46', fontWeight: '600' }}>온실가스 감축량 CO₂</div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#10B981', marginBottom: '0.5rem' }}>
                  8.9만그루
                </div>
                <div style={{ fontSize: '1rem', color: '#065F46', fontWeight: '600' }}>나무 식재 효과</div>
              </div>
            </div>

            <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1.125rem', color: '#065F46', lineHeight: '1.6' }}>
              👉 폐기 대신 순환을 선택한 결과, <strong>환경과 사회가 동시에 개선</strong>되었습니다.
            </p>
          </div>
        </section>

        {/* 2. 장난감 순환 사업 */}
        <section className="section">
          <h2 className="section-title">♻️ 장난감 순환 사업</h2>
          <p className="section-subtitle">
            버려질 장난감의 새로운 여정
          </p>

          <div className="card" style={{ marginBottom: '2rem' }}>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#374151', marginBottom: '2rem' }}>
              고장 나거나 더 이상 사용되지 않는 장난감은<br/>
              코끼리공장에서 <strong>분류 → 수리 → 나눔 → 재생</strong>의 과정을 거칩니다.
            </p>

            <div style={{ backgroundColor: '#F9FAFB', padding: '2rem', borderRadius: '0.75rem', borderLeft: '4px solid #10B981' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: '#10B981' }}>
                ✔ 주요 활동
              </h3>
              <ul style={{ color: '#6B7280', lineHeight: '2', fontSize: '1rem' }}>
                <li>📦 장난감 수거 및 상태 분류</li>
                <li>🧹 세척·소독 및 수리</li>
                <li>🎁 수리 가능한 장난감 → <strong>취약 아동 나눔</strong></li>
                <li>♻️ 수리 불가능 장난감 → <strong>재생소재 원료화</strong></li>
              </ul>
            </div>

            <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1.125rem', color: '#10B981', fontWeight: '600' }}>
              장난감 하나가 쓰레기가 아닌 <strong>'사회적 자원'</strong>이 되는 과정입니다.
            </p>
          </div>
        </section>

        {/* 3. 기부 가능 장난감 안내 */}
        <section className="section">
          <h2 className="section-title">🎁 기부 가능 장난감 안내</h2>
          <p className="section-subtitle">
            이런 장난감은 다시 사용됩니다
          </p>

          <div className="card-grid">
            <div className="card" style={{ borderLeft: '4px solid #10B981' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: '#10B981' }}>
                ✅ 기부 가능한 장난감
              </h3>
              <ul style={{ color: '#6B7280', lineHeight: '2' }}>
                <li>플라스틱 소형 장난감</li>
                <li>소형·중형 인형</li>
                <li>일부 부품이 없거나 고장 난 소형 장난감</li>
                <li>아동 도서, 사운드북</li>
                <li>플라스틱 블록류</li>
              </ul>
            </div>

            <div className="card" style={{ borderLeft: '4px solid #EF4444' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: '#EF4444' }}>
                ❌ 기부가 어려운 장난감
              </h3>
              <ul style={{ color: '#6B7280', lineHeight: '2' }}>
                <li>대형 장난감, 미끄럼틀</li>
                <li>대형 인형, 건전지 내장 인형 (세탁 불가)</li>
                <li>개인 아동용품 (보행기, 치발기)</li>
                <li>나무 소재 장난감</li>
                <li>대형 자동차, 탈것류</li>
              </ul>
            </div>
          </div>

          <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1.125rem', color: '#374151' }}>
            👉 <strong>안전과 위생 기준</strong>을 최우선으로 운영합니다.
          </p>
        </section>

        {/* 4. 장난감 나눔 과정 */}
        <section className="section">
          <h2 className="section-title">🔄 장난감 나눔 과정</h2>
          <p className="section-subtitle">
            기부에서 나눔까지, 5단계 프로세스
          </p>

          <div className="card">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
              <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: '#F0FDF4', borderRadius: '0.75rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>1️⃣</div>
                <div style={{ fontSize: '1rem', fontWeight: '600', color: '#065F46' }}>장난감 기부 신청 및 수거</div>
              </div>

              <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: '#EFF6FF', borderRadius: '0.75rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>2️⃣</div>
                <div style={{ fontSize: '1rem', fontWeight: '600', color: '#1E40AF' }}>장난감 상태 확인 및 분류</div>
              </div>

              <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: '#FEF3C7', borderRadius: '0.75rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>3️⃣</div>
                <div style={{ fontSize: '1rem', fontWeight: '600', color: '#92400E' }}>수리 가능 여부 판단</div>
              </div>

              <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: '#FCE7F3', borderRadius: '0.75rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>4️⃣</div>
                <div style={{ fontSize: '1rem', fontWeight: '600', color: '#831843' }}>수리된 장난감 → 취약 아동 전달</div>
              </div>

              <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: '#F3F4F6', borderRadius: '0.75rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>5️⃣</div>
                <div style={{ fontSize: '1rem', fontWeight: '600', color: '#374151' }}>폐장난감 → 재생소재로 재탄생</div>
              </div>
            </div>

            <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1.125rem', color: '#10B981', fontWeight: '600', lineHeight: '1.8' }}>
              기부자는 단순한 제공자가 아니라<br/>
              <strong>순환을 완성하는 '나눔 히어로'</strong>입니다.
            </p>
          </div>
        </section>

        {/* 5. 장난감 순환 체계 */}
        <section className="section">
          <h2 className="section-title">🌍 장난감 순환 체계</h2>
          <p className="section-subtitle">
            나눔 + 자원순환 + 환경교육의 연결
          </p>

          <div className="card-grid">
            <div className="card" style={{ backgroundColor: '#DBEAFE', borderTop: '4px solid #3B82F6' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>🎁</div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.75rem', color: '#1E40AF', textAlign: 'center' }}>
                장난감이 없는 아이들에게 나눔
              </h3>
              <p style={{ fontSize: '0.9375rem', color: '#6B7280', textAlign: 'center', lineHeight: '1.6' }}>
                수리된 장난감을 취약계층 아동에게 무상 제공
              </p>
            </div>

            <div className="card" style={{ backgroundColor: '#FEF3C7', borderTop: '4px solid #F59E0B' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>🔧</div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.75rem', color: '#92400E', textAlign: 'center' }}>
                고장난 장난감은 분해·소재화
              </h3>
              <p style={{ fontSize: '0.9375rem', color: '#6B7280', textAlign: 'center', lineHeight: '1.6' }}>
                수리 불가능한 장난감을 체계적으로 분해
              </p>
            </div>

            <div className="card" style={{ backgroundColor: '#D1FAE5', borderTop: '4px solid #10B981' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>♻️</div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.75rem', color: '#065F46', textAlign: 'center' }}>
                플라스틱은 재생 원료로 재탄생
              </h3>
              <p style={{ fontSize: '0.9375rem', color: '#6B7280', textAlign: 'center', lineHeight: '1.6' }}>
                고품질 재생 플라스틱 소재로 전환
              </p>
            </div>

            <div className="card" style={{ backgroundColor: '#FCE7F3', borderTop: '4px solid #EC4899' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>📚</div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.75rem', color: '#831843', textAlign: 'center' }}>
                정크아트·전시·교육으로 환경 인식 확산
              </h3>
              <p style={{ fontSize: '0.9375rem', color: '#6B7280', textAlign: 'center', lineHeight: '1.6' }}>
                창의적인 재활용 교육 프로그램 운영
              </p>
            </div>
          </div>

          <div className="card" style={{ marginTop: '2rem', textAlign: 'center', backgroundColor: '#F0FDF4' }}>
            <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#10B981', lineHeight: '1.8' }}>
              "버려지는 장난감으로 새로운 세상을 만듭니다."
            </p>
          </div>
        </section>

        {/* 6. 개인 기부 참여 방법 */}
        <section className="section">
          <h2 className="section-title">🤝 개인 기부 참여 방법</h2>
          <p className="section-subtitle">
            누구나 쉽게 참여할 수 있습니다
          </p>

          <div className="card">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              <div style={{ padding: '1.5rem', backgroundColor: '#F0FDF4', borderRadius: '0.75rem', borderLeft: '4px solid #10B981' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🏢</div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.5rem', color: '#065F46' }}>
                  1️⃣ 에코스테이션 직접 방문
                </h3>
                <p style={{ fontSize: '0.9375rem', color: '#6B7280', lineHeight: '1.6' }}>
                  코끼리공장 에코스테이션으로 직접 방문하여 기부
                </p>
              </div>

              <div style={{ padding: '1.5rem', backgroundColor: '#EFF6FF', borderRadius: '0.75rem', borderLeft: '4px solid #3B82F6' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🏫</div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.5rem', color: '#1E40AF' }}>
                  2️⃣ 협약 기관을 통해 전달
                </h3>
                <p style={{ fontSize: '0.9375rem', color: '#6B7280', lineHeight: '1.6' }}>
                  협약된 어린이집·학교·기관을 통해 전달
                </p>
              </div>

              <div style={{ padding: '1.5rem', backgroundColor: '#FEF3C7', borderRadius: '0.75rem', borderLeft: '4px solid #F59E0B' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📦</div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.5rem', color: '#92400E' }}>
                  3️⃣ 택배 발송
                </h3>
                <p style={{ fontSize: '0.9375rem', color: '#6B7280', lineHeight: '1.6' }}>
                  택배 발송 (배송비 자부담)
                </p>
              </div>
            </div>

            <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1.125rem', color: '#10B981', fontWeight: '600' }}>
              👉 개인의 작은 참여가 큰 순환을 만듭니다.
            </p>
          </div>
        </section>

        {/* 7. 재생소재 생산 */}
        <section className="section">
          <h2 className="section-title">🔬 재생소재 생산</h2>
          <p className="section-subtitle">
            장난감 플라스틱의 두 번째 삶
          </p>

          <div className="card" style={{ marginBottom: '2rem' }}>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#374151', marginBottom: '2rem' }}>
              수리가 불가능한 폐장난감은<br/>
              <strong>고품질 재생 플라스틱 소재</strong>로 전환됩니다.
            </p>

            <div style={{ backgroundColor: '#F0FDF4', padding: '2rem', borderRadius: '0.75rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: '#065F46' }}>
                ✨ 재생소재 특징
              </h3>
              <ul style={{ color: '#6B7280', lineHeight: '2', fontSize: '1rem' }}>
                <li>✅ 장난감 플라스틱은 <strong>유해성이 낮음</strong></li>
                <li>✅ 혼합소재를 정확히 분리하면 부가가치 <strong>최대 10배 상승</strong></li>
                <li>✅ 초분광 선별기 활용 → <strong>95% 순도 분리</strong></li>
                <li>✅ 연간 약 <strong>300톤 규모</strong> 재생소재 생산</li>
              </ul>
            </div>
          </div>

          <div className="card" style={{ backgroundColor: '#FFFBEB' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: '#92400E', textAlign: 'center' }}>
              🏭 플라스틱 재생소재 생산 공정
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', fontSize: '1.125rem', fontWeight: '600', color: '#78350F' }}>
              <div>파쇄</div>
              <div>→</div>
              <div>용융</div>
              <div>→</div>
              <div>압출</div>
              <div>→</div>
              <div>경화</div>
              <div>→</div>
              <div style={{ color: '#10B981', fontSize: '1.25rem' }}>Pellet</div>
              <div>→</div>
              <div>유통</div>
            </div>
            <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1rem', color: '#6B7280', lineHeight: '1.6' }}>
              이 과정을 통해 재생 플라스틱은<br/>
              다시 <strong>제품·전시·생활용품</strong>으로 사용됩니다.
            </p>
          </div>
        </section>

        {/* 8. 함께하는 파트너 (실제 데이터 연동) */}
        <section className="section">
          <h2 className="section-title">🤝 함께하는 파트너</h2>
          <p className="section-subtitle">
            코끼리공장과 함께 지속 가능한 미래를 만들어가는 기업들
          </p>

          <div className="card">
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p style={{ fontSize: '1.125rem', color: '#6B7280', lineHeight: '1.8', marginBottom: '2rem' }}>
                현재 <strong style={{ color: '#10B981', fontSize: '1.5rem' }}>{partnerCount}개 파트너 기업</strong>과 함께<br/>
                ESG 경영 실천과 사회적 가치 창출을 이어가고 있습니다.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                {companies.map((company) => (
                  <div key={company.id} style={{
                    padding: '1.5rem',
                    backgroundColor: '#F9FAFB',
                    borderRadius: '0.75rem',
                    border: '2px solid #E5E7EB',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{company.logo}</div>
                    <div style={{ fontSize: '1.125rem', fontWeight: '700', color: '#111827', marginBottom: '0.25rem' }}>
                      {company.name}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                      {company.industry}
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/companies" className="btn btn-primary">
                파트너 기업별 성과 자세히 보기 →
              </Link>
            </div>
          </div>
        </section>

        {/* 슬로건 */}
        <section className="section">
          <div className="card" style={{
            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            color: 'white',
            textAlign: 'center',
            padding: '3rem'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🐘</div>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', lineHeight: '1.6' }}>
              "코끼리공장은 장난감을 버리지 않고,<br/>
              사회로 되돌려줍니다."
            </h2>
          </div>
        </section>

        {/* ESG 캠페인 동참하기 CTA */}
        <section className="section">
          <div className="card" style={{
            background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
            color: 'white',
            textAlign: 'center',
            padding: '3rem',
            boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌱</div>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: '700' }}>
              우리 기업도 ESG 캠페인에 동참하고 싶다면?
            </h2>
            <p style={{ fontSize: '1.125rem', marginBottom: '2.5rem', opacity: 0.95, lineHeight: '1.8' }}>
              지속 가능한 미래를 함께 만들어갈 파트너를 찾습니다.<br/>
              측정 가능한 임팩트로 ESG 등급 상승의 기반을 마련하세요.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="https://kogongjang.com/theme/kogong/html/formmail/inquiry_01.php"
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{
                  backgroundColor: 'white',
                  color: '#3B82F6',
                  fontSize: '1.25rem',
                  padding: '1.25rem 2.5rem',
                  textDecoration: 'none',
                  fontWeight: '700',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  display: 'inline-block'
                }}
              >
                🚀 ESG 캠페인 동참하기
              </a>
              <Link
                to="/dashboard"
                className="btn"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: 'white',
                  fontSize: '1.125rem',
                  padding: '1.25rem 2rem',
                  textDecoration: 'none',
                  border: '2px solid white',
                  fontWeight: '600',
                  display: 'inline-block'
                }}
              >
                📊 성과 데이터 먼저 보기
              </Link>
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

export default KogongjangOverview;
