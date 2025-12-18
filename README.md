# 코끼리공장 ESG 대시보드

폐플라스틱(PET/HDPE)과 복합 플라스틱(장난감) 수거 데이터를 기반으로 탄소 저감량, ESG KPI(Tier1~3), 파트너사 성과를 시각화하는 React 대시보드입니다.

## 목차
- [주요 기능](#주요-기능)
- [탄소 저감 계산 근거](#탄소-저감-계산-근거)
- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [실행 방법](#실행-방법)
- [배포](#배포)
- [데이터 & 참고 문서](#데이터--참고-문서)

## 주요 기능
- 홈/개요: ESG 임팩트 하이라이트, 참여·수거·CO₂ 절감량 요약
- 대시보드 & 프로젝트/코끼리공장 소개: ESG 기준(KCGS/MSCI/GRI)과 매핑된 핵심 KPI 뷰
- Tier1/2 상세: E/S/G 지표, 참여율·순환자원 전환율·탄소 절감량 상세 카드
- 기업 리스트/상세: 회사별 수거·CO₂·참여 인원·환산 지표(나무/자동차/빙하) 비교
- ESG 시뮬레이터 & 데이터 입력: 가정값 입력, 더미 데이터/차트 렌더링
- 데이터 시각화: Recharts 기반 차트, HashRouter 네비게이션

## 탄소 저감 계산 근거
- 폐기물 계수: PET 2.29 kg CO₂/kg, HDPE 3.12 kg CO₂/kg, 혼합 플라스틱 2.75 kg CO₂/kg
- 보정 계수: 재사용 RBF 3.0, 업사이클링 UF 2.5, 일반 재활용 1.0
- 공식: Σ(경로별 수거량 × 기본 CO₂ 계수 × 보정계수)
- 근거 문서: `탄소저감량_계산로직.md`, `폐플라스틱_섬유_가공_분석.md`, `회사별_더미데이터_요약.md`

## 기술 스택
- React 19, react-router-dom(HashRouter), Recharts
- 데이터 처리: xlsx, html2canvas, jsPDF, jspdf-autotable
- 빌드/런타임: create-react-app 기반, npm scripts

## 프로젝트 구조
```
src
├─ components/        # 페이지·카드·차트 컴포넌트
├─ data/              # companiesData.js 등 더미/성과 데이터
├─ utils/             # 공통 유틸리티
├─ App.js             # 라우팅 및 페이지 엔트리
└─ App.css            # 글로벌 스타일
```

## 실행 방법
```bash
npm install
npm start        # http://localhost:3000
npm test         # 테스트 러너
npm run build    # 프로덕션 빌드
```

## 배포
- `npm run deploy`: gh-pages(`homepage`=https://mintai09.github.io/elephant-factory-dashboard-renew)로 배포

## 데이터 & 참고 문서
- 계산/모델: `탄소저감량_계산로직.md`, `폐플라스틱_섬유_가공_분석.md`
- 기업/더미 데이터: `src/data/companiesData.js`
- KPI 요약: `회사별_더미데이터_요약.md`
