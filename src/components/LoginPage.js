import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../services/AuthService';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isLoading: false,
      errorMessage: ""
    };
  }

  handleLogin = async () => {
    const { username, password } = this.state;
    
    if (!username || !password) {
      this.setState({ errorMessage: "아이디와 비밀번호를 입력해주세요." });
      return;
    }

    this.setState({ isLoading: true, errorMessage: "" });

    try {
      const result = await AuthService.login(username, password);
      
      // 로그인 성공 시 부모 컴포넌트에 사용자 정보 전달
      this.props.onLogin({
        username: result.username,
        accessToken: result.accessToken,
        idToken: result.idToken
      });
      
      this.props.navigate("/");
    } catch (error) {
      console.error("로그인 실패:", error);
      
      let errorMsg = "로그인에 실패했습니다.";
      if (error.code === 'NotAuthorizedException') {
        errorMsg = "아이디 또는 비밀번호가 올바르지 않습니다.";
      } else if (error.code === 'UserNotConfirmedException') {
        errorMsg = "이메일 인증이 완료되지 않았습니다.";
      } else if (error.code === 'UserNotFoundException') {
        errorMsg = "존재하지 않는 사용자입니다.";
      }
      
      this.setState({ errorMessage: errorMsg });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { username, password, isLoading, errorMessage } = this.state;

    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 font-sans text-gray-800">
        <header className="header">
          <div className="logo" onClick={() => this.props.navigate("/")}>
            ☁️
          </div>
        </header>
        <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-lg">
          <h2 className="mb-6 text-3xl font-bold">로그인</h2>
          
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {errorMessage}
            </div>
          )}
          
          <div className="space-y-4">
            <div className="text-left">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                아이디
              </label>
              <input
                type="text"
                placeholder="아이디"
                value={username}
                onChange={(e) => this.setState({ username: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="text-left">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                비밀번호
              </label>
              <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => this.setState({ password: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <button
              className={`w-full rounded-xl py-3 font-medium text-white shadow transition ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
              onClick={this.handleLogin}
              disabled={isLoading}
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </button>
          </div>
          
          <div className="mt-6 text-sm text-gray-500">
            계정이 없으신가요?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:underline"
            >
              회원가입
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
