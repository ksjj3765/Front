import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { userPool } from '../aws-config';

class AuthService {
  // 로그인
  async login(username, password) {
    return new Promise((resolve, reject) => {
      const authenticationDetails = new AuthenticationDetails({
        Username: username,
        Password: password,
      });

      const cognitoUser = new CognitoUser({
        Username: username,
        Pool: userPool,
      });

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          // 로그인 성공 시 토큰들 저장
          const accessToken = result.getAccessToken().getJwtToken();
          const idToken = result.getIdToken().getJwtToken();
          const refreshToken = result.getRefreshToken().getToken();
          
          // 토큰들을 localStorage에 저장
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('idToken', idToken);
          localStorage.setItem('refreshToken', refreshToken);
          
          resolve({
            accessToken,
            idToken,
            refreshToken,
            username
          });
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  // 로그아웃
  async logout() {
    return new Promise((resolve, reject) => {
      const currentUser = userPool.getCurrentUser();
      if (currentUser) {
        currentUser.signOut();
        // localStorage에서 토큰들 제거
        localStorage.removeItem('accessToken');
        localStorage.removeItem('idToken');
        localStorage.removeItem('refreshToken');
        resolve();
      } else {
        reject(new Error('No user logged in'));
      }
    });
  }

  // 토큰 새로고침
  async refreshToken() {
    return new Promise((resolve, reject) => {
      const currentUser = userPool.getCurrentUser();
      if (currentUser) {
        currentUser.getSession((err, session) => {
          if (err) {
            reject(err);
          } else if (session.isValid()) {
            resolve(session);
          } else {
            // 세션이 만료된 경우 새로고침
            currentUser.refreshSession(session.getRefreshToken(), (err, newSession) => {
              if (err) {
                reject(err);
              } else {
                // 새로운 토큰들 저장
                const accessToken = newSession.getAccessToken().getJwtToken();
                const idToken = newSession.getIdToken().getJwtToken();
                
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('idToken', idToken);
                
                resolve(newSession);
              }
            });
          }
        });
      } else {
        reject(new Error('No user logged in'));
      }
    });
  }

  // 현재 사용자 정보 가져오기
  async getCurrentUser() {
    return new Promise((resolve, reject) => {
      const currentUser = userPool.getCurrentUser();
      if (currentUser) {
        currentUser.getSession((err, session) => {
          if (err) {
            reject(err);
          } else if (session.isValid()) {
            // ID 토큰에서 사용자 정보 추출
            const idToken = session.getIdToken();
            const payload = idToken.decodePayload();
            
            resolve({
              username: payload['cognito:username'],
              email: payload.email,
              sub: payload.sub,
            });
          } else {
            reject(new Error('Session expired'));
          }
        });
      } else {
        resolve(null);
      }
    });
  }

  // 토큰 유효성 검사
  isTokenValid() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return false;
    
    try {
      // JWT 토큰 만료 시간 확인
      const payload = JSON.parse(atob(accessToken.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      
      return payload.exp > currentTime;
    } catch (error) {
      return false;
    }
  }

  // 현재 저장된 토큰 가져오기
  getStoredTokens() {
    return {
      accessToken: localStorage.getItem('accessToken'),
      idToken: localStorage.getItem('idToken'),
      refreshToken: localStorage.getItem('refreshToken')
    };
  }
}

export default new AuthService();
