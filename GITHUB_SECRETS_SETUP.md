# GitHub Secrets 설정 가이드

이 프로젝트는 GitHub Actions를 통해 자동으로 빌드 및 배포됩니다.
Potens AI 챗봇 API 키를 안전하게 관리하기 위해 GitHub Secrets를 사용합니다.

## ⚠️ 중요: 보안 경고

**GitHub Secrets를 사용해도 API 키는 최종 빌드 파일에 포함됩니다.**
브라우저 개발자 도구로 여전히 확인 가능하므로, 프로덕션 환경에서는 백엔드 프록시 서버를 사용하는 것이 권장됩니다.

## 설정 방법

### 1. GitHub Repository Settings로 이동

1. GitHub 저장소 페이지로 이동
2. **Settings** 탭 클릭
3. 왼쪽 사이드바에서 **Secrets and variables** → **Actions** 클릭

### 2. Repository Secrets 추가

**New repository secret** 버튼을 클릭하고 다음 4개의 Secrets를 추가:

#### Secret 1: `REACT_APP_POTENS_API_KEY`
- **Name**: `REACT_APP_POTENS_API_KEY`
- **Value**: 실제 Potens AI API Key 값

#### Secret 2: `REACT_APP_POTENS_ULID`
- **Name**: `REACT_APP_POTENS_ULID`
- **Value**: 실제 Potens ULID 값

#### Secret 3: `REACT_APP_POTENS_MODEL`
- **Name**: `REACT_APP_POTENS_MODEL`
- **Value**: `claude-4-sonnet` (또는 사용할 모델명)

#### Secret 4: `REACT_APP_POTENS_API_URL`
- **Name**: `REACT_APP_POTENS_API_URL`
- **Value**: `https://ai.potens.ai/api/pota`

### 3. GitHub Pages 설정

1. Repository **Settings** → **Pages**로 이동
2. **Source**를 **GitHub Actions**로 선택
   - 또는 **Deploy from a branch** 선택 후 **gh-pages** 브랜치 선택

### 4. 배포 트리거

이제 `main` 브랜치에 코드를 push하면 자동으로:
1. GitHub Actions가 실행됩니다
2. Secrets에서 환경 변수를 가져와 `.env` 파일을 생성합니다
3. 프로젝트를 빌드합니다
4. GitHub Pages에 배포합니다

```bash
git add .
git commit -m "Add GitHub Actions deployment"
git push origin main
```

### 5. 배포 상태 확인

- Repository의 **Actions** 탭에서 워크플로우 실행 상태 확인
- 배포 완료 후 https://mintai09.github.io/elephant-factory-dashboard-renew/ 에서 확인

## 로컬 개발 환경

로컬에서 개발할 때는 여전히 `.env` 파일을 사용합니다:

```bash
# .env 파일 생성 (이미 있다면 건너뛰기)
cp .env.example .env

# .env 파일 편집하여 실제 값 입력
# 로컬 개발 서버 실행
npm start
```

`.env` 파일은 `.gitignore`에 포함되어 있어 Git에 커밋되지 않습니다.

## 수동 배포 (선택사항)

GitHub Actions 없이 로컬에서 직접 배포하려면:

```bash
npm run deploy
```

⚠️ 이 경우 로컬 `.env` 파일의 값이 사용되므로 주의하세요.

## 문제 해결

### Actions 워크플로우가 실행되지 않는 경우
1. Repository Settings → Actions → General 확인
2. "Allow all actions and reusable workflows" 활성화 확인

### 배포 후 404 에러가 발생하는 경우
1. `package.json`의 `homepage` 필드가 올바른지 확인
2. GitHub Pages 설정에서 올바른 브랜치가 선택되었는지 확인

### Secrets가 작동하지 않는 경우
1. Secret 이름의 철자가 정확한지 확인 (대소문자 구분)
2. Actions 탭에서 워크플로우 로그 확인
