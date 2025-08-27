# 환경 변수 설정 가이드

## 📝 **환경 변수 설정 방법**

프론트 서비스를 실행하기 전에 환경 변수를 설정해야 합니다.

### **1. .env 파일 생성**

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
# 백엔드 API 설정 (백엔드 서비스와 연동 시)
REACT_APP_API_BASE_URL=http://localhost:5000

# AWS Cognito 설정 (AWS Cognito 사용 시)
REACT_APP_COGNITO_USER_POOL_ID=your_user_pool_id
REACT_APP_COGNITO_CLIENT_ID=your_client_id
REACT_APP_COGNITO_REGION=ap-northeast-2

# 개발 환경 설정
NODE_ENV=development
CHOKIDAR_USEPOLLING=true
```

### **2. 환경 변수 설명**

| 변수명 | 설명 | 기본값 | 필수 여부 |
|--------|------|--------|-----------|
| `REACT_APP_API_BASE_URL` | 백엔드 API 서버 URL | - | 백엔드 연동 시 |
| `REACT_APP_COGNITO_USER_POOL_ID` | AWS Cognito User Pool ID | - | Cognito 사용 시 |
| `REACT_APP_COGNITO_CLIENT_ID` | AWS Cognito Client ID | - | Cognito 사용 시 |
| `REACT_APP_COGNITO_REGION` | AWS Cognito 리전 | ap-northeast-2 | Cognito 사용 시 |

### **3. 독립 실행 시**

백엔드 서비스 없이 프론트만 독립적으로 실행하려면:

```env
# 백엔드 연동 없이 실행
NODE_ENV=development
CHOKIDAR_USEPOLLING=true
```

### **4. Docker 실행 시**

Docker로 실행할 때는 환경 변수를 docker-compose.yml에 설정하거나:

```bash
# 환경 변수와 함께 실행
docker run -d -p 3000:3000 \
  -e NODE_ENV=development \
  -e CHOKIDAR_USEPOLLING=true \
  --name front-container front-service
```

### **5. 주의사항**

- `.env` 파일은 `.gitignore`에 포함되어 있어 Git에 커밋되지 않습니다
- 프로덕션 환경에서는 보안을 위해 환경 변수를 적절히 관리하세요
- React 앱에서는 `REACT_APP_` 접두사가 붙은 환경 변수만 사용할 수 있습니다

