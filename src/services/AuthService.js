class AuthService {
  // 로그인
  async login(username, password) {
    return new Promise((resolve, reject) => {
      // 간단한 검증 (실제로는 백엔드 API를 호출해야 함)
      if (username && password) {
        // 임시로 성공 처리 (실제로는 백엔드에서 검증)
        const userData = {
          username: username,
          email: `${username}@example.com`,
          accessToken: 'temp-access-token-' + Date.now(),
          idToken: 'temp-id-token-' + Date.now()
        };
        
        // 로컬 스토리지에 저장
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('accessToken', userData.accessToken);
        localStorage.setItem('idToken', userData.idToken);
        
        resolve(userData);
      } else {
        reject(new Error('사용자명과 비밀번호를 입력해주세요.'));
      }
    });
  }

  // 로그아웃
  async logout() {
    return new Promise((resolve) => {
      // 로컬 스토리지에서 사용자 정보 제거
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('idToken');
      resolve();
    });
  }

  // 현재 사용자 정보 가져오기
  async getCurrentUser() {
    return new Promise((resolve) => {
      const userData = localStorage.getItem('user');
      if (userData) {
        resolve(JSON.parse(userData));
      } else {
        resolve(null);
      }
    });
  }

  // 토큰 유효성 검사
  isTokenValid() {
    const accessToken = localStorage.getItem('accessToken');
    return !!accessToken;
  }

  // 현재 저장된 토큰 가져오기
  getStoredTokens() {
    return {
      accessToken: localStorage.getItem('accessToken'),
      idToken: localStorage.getItem('idToken')
    };
  }
}

export default new AuthService();
