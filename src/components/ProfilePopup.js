import React, { Component } from 'react';
import { LogOut, User } from 'lucide-react';
import AuthService from '../services/AuthService';

class ProfilePopup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogout = async () => {
    try {
      await AuthService.logout();
      
      // 부모 컴포넌트의 상태 업데이트
      this.props.setIsLoggedIn(false);
      this.props.setCurrentUser(null);
      this.props.setProfileImage(null);
      
      alert("로그아웃 되었습니다.");
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
      alert("로그아웃 처리 중 문제가 발생했습니다.");
    }
  };

  handleMyPage = () => {
    this.props.onClose();
    this.props.navigate("/mypage");
  };

  render() {
    const { onClose, profileImage, currentUser } = this.props;
    
    return (
      <div className="absolute right-0 top-12 z-50 w-64 rounded-xl bg-white p-4 shadow-xl ring-1 ring-gray-200">
        <div className="flex items-center space-x-3 border-b pb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <User size={26} />
            )}
          </div>
          <div className="flex-1">
            <p className="text-lg font-bold text-gray-800">
              {currentUser?.username || "USER"}
            </p>
            <p className="text-sm text-gray-500">{currentUser?.email || ""}</p>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <button
            className="flex w-full items-center space-x-2 rounded-lg p-2 text-left text-gray-700 transition hover:bg-gray-100"
            onClick={this.handleMyPage}
          >
            <User size={20} />
            <span>마이페이지</span>
          </button>
          <button
            className="flex w-full items-center space-x-2 rounded-lg p-2 text-left text-gray-700 transition hover:bg-gray-100"
            onClick={this.handleLogout}
          >
            <LogOut size={20} />
            <span>로그아웃</span>
          </button>
        </div>
      </div>
    );
  }
}

export default ProfilePopup;
