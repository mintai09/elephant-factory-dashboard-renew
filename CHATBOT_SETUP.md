# 챗봇 설정 가이드

## 환경 변수 설정

챗봇 기능을 사용하려면 Potens AI API 키가 필요합니다.

### 1. .env 파일 생성

프로젝트 루트 디렉토리에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```bash
REACT_APP_POTENS_API_KEY=your_api_key_here
REACT_APP_POTENS_ULID=your_ulid_here
REACT_APP_POTENS_MODEL=claude-4-sonnet
REACT_APP_POTENS_API_URL=https://ai.potens.ai/api/pota
```

### 2. API 키 발급

Potens AI에서 API 키와 ULID를 발급받아 위 값을 채워주세요.

### 3. 보안 주의사항

⚠️ **중요**: `.env` 파일은 절대 Git에 커밋하지 마세요!
- `.env` 파일은 `.gitignore`에 이미 추가되어 있습니다.
- API 키가 노출되면 즉시 재발급하세요.
- 프로덕션 배포 시에는 환경 변수를 별도로 설정하세요.

### 4. 개발 서버 재시작

환경 변수를 추가한 후에는 개발 서버를 재시작해야 합니다:

```bash
npm start
```

## 챗봇 기능

- 우측 하단 💬 버튼을 클릭하면 챗봇이 열립니다.
- 코끼리공장 ESG 대시보드 관련 질문에 답변합니다.
- Claude 4 Sonnet 모델을 사용합니다.

## 문제 해결

### "응답을 받을 수 없습니다" 오류가 발생하는 경우

1. **브라우저 콘솔 확인**
   - F12 키를 눌러 개발자 도구 열기
   - Console 탭에서 `API Response:` 로그 확인
   - 실제 API 응답 구조 확인

2. **환경 변수 확인**
   ```bash
   # .env 파일 내용 확인
   REACT_APP_POTENS_API_KEY=your_actual_key
   REACT_APP_POTENS_ULID=your_actual_ulid
   REACT_APP_POTENS_MODEL=claude-4-sonnet
   REACT_APP_POTENS_API_URL=https://ai.potens.ai/api/pota
   ```

3. **개발 서버 재시작**
   ```bash
   # Ctrl+C로 서버 종료 후
   npm start
   ```

4. **API 테스트 (PowerShell)**
   ```powershell
   $headers = @{
       "Authorization" = "Bearer your_api_key_here"
       "Content-Type" = "application/json"
   }
   $body = @{
       ulid = "your_ulid_here"
       prompt = "테스트 질문"
       model = "claude-4-sonnet"
   } | ConvertTo-Json

   Invoke-RestMethod -Uri "https://ai.potens.ai/api/pota" -Method Post -Headers $headers -Body $body
   ```

### API 키 오류가 발생하는 경우

1. `.env` 파일이 프로젝트 루트에 있는지 확인
2. 환경 변수 이름이 정확한지 확인 (REACT_APP_ 접두사 필수)
3. 개발 서버를 재시작했는지 확인
4. API 키와 ULID가 유효한지 확인

### 디버깅 로그

콘솔에서 다음 로그를 확인하세요:
- `API Response:` - 실제 API 응답 데이터
- `Unexpected response format:` - 예상치 못한 응답 형식
- `Chatbot error:` - 에러 발생 시 상세 정보
