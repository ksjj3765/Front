import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { User, Heart, MessageCircle } from 'lucide-react';
import ProfilePopup from './ProfilePopup';

class MainBoardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortOrder: "latest",
      showProfilePopup: false,
      searchTerm: "",
      currentPage: 1,
      postsPerPage: 10,
      newPostContent: "",
      activeCategory: "전체",
      isModalOpen: false
    };
    this.categories = ["전체", "동물/반려동물", "여행", "건강/헬스", "연예인"];
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({ currentPage: 1 });
    }
  }

  handlePostSubmit = (e) => {
    e.preventDefault();
    if (this.state.newPostContent.trim() === "") {
      alert("내용을 입력해주세요.");
      return;
    }

    const newPost = {
      title: "",
      content: this.state.newPostContent,
      userName: this.props.currentUser?.username || "Anonymous",
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: [],
      profileImage: this.props.profileImage,
    };

    this.props.setPosts([newPost, ...this.props.posts]);
    this.setState({ 
      newPostContent: "",
      isModalOpen: false 
    });
  };

  render() {
    const { isLoggedIn, onLogout, profileImage, posts, currentUser } = this.props;
    const { 
      sortOrder, 
      showProfilePopup, 
      searchTerm, 
      currentPage, 
      postsPerPage, 
      newPostContent, 
      activeCategory, 
      isModalOpen 
    } = this.state;

    const filteredPosts = posts.filter(
      (post) =>
        (activeCategory === "전체" || post.category === activeCategory) &&
        (post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (post.title &&
            post.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
          post.userName.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const sortedAndFilteredPosts = [...filteredPosts].sort((a, b) => {
      if (sortOrder === "popular") {
        return b.likes - a.likes;
      }
      return b.id - a.id;
    });

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = sortedAndFilteredPosts.slice(
      indexOfFirstPost,
      indexOfLastPost
    );
    const totalPages = Math.ceil(sortedAndFilteredPosts.length / postsPerPage);

    return (
      <div className="main-board-wrapper">
        <div className="main-board-container">
          {/* Left Sidebar */}
          <div className="sidebar">
            <div className="sidebar-header">
              <Link to="/" className="logo-link">
                ☁️
              </Link>
            </div>
            <div className="category-section">
              <h3 className="category-title">카테고리</h3>
              <ul className="category-list">
                {this.categories.map((category) => (
                  <li key={category}>
                    <button
                      className={`category-btn ${
                        activeCategory === category ? "active" : ""
                      }`}
                      onClick={() => this.setState({ activeCategory: category })}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Main Content Area */}
          <div className="main-content-area">
            {/* Header with Search and Profile */}
            <header className="main-header">
              <div className="right-header-wrapper">
                <div className="search-bar-container">
                  <input
                    type="text"
                    placeholder="검색"
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => this.setState({ searchTerm: e.target.value })}
                  />
                  <button className="search-button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </button>
                </div>
                <div className="header-actions">
                  {isLoggedIn ? (
                    <div className="profile-container relative">
                      <button
                        className="profile-btn"
                        onClick={() => this.setState({ showProfilePopup: !showProfilePopup })}
                      >
                        {profileImage ? (
                          <img
                            src={profileImage}
                            alt="Profile"
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <User />
                        )}
                      </button>
                      {showProfilePopup && (
                        <ProfilePopup
                          onClose={() => this.setState({ showProfilePopup: false })}
                          onLogout={onLogout}
                          profileImage={profileImage}
                          currentUser={currentUser}
                          setIsLoggedIn={this.props.setIsLoggedIn}
                          setCurrentUser={this.props.setCurrentUser}
                          setProfileImage={this.props.setProfileImage}
                          navigate={this.props.navigate}
                        />
                      )}
                    </div>
                  ) : (
                    <>
                      <Link to="/signup" className="signup-btn">
                        회원가입
                      </Link>
                      <Link to="/login" className="login-btn">
                        로그인
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </header>
            <div className="sort-buttons">
              <button
                className={`sort-btn ${sortOrder === "latest" ? "active" : ""}`}
                onClick={() => this.setState({ sortOrder: "latest" })}
              >
                최신순
              </button>
              <button
                className={`sort-btn ${sortOrder === "popular" ? "active" : ""}`}
                onClick={() => this.setState({ sortOrder: "popular" })}
              >
                인기순
              </button>
              {isLoggedIn && (
                <button
                  className="post-create-btn"
                  onClick={() => this.props.navigate("/new-post")}
                >
                  새 게시물 작성
                </button>
              )}
            </div>
            <div className="post-list">
              {currentPosts.map((post) => (
                <div
                  key={post.id}
                  className="post-card"
                  onClick={() => this.props.navigate(`/posts/${post.id}`, { state: post })}
                  style={{ cursor: "pointer" }}
                >
                  <div className="post-header">
                    <div className="post-author">{post.userName}</div>
                    <div className="post-stats">
                      <span className="stat-item">
                        <Heart />
                        <span className="stat-count">{post.likes}</span>
                      </span>
                      <span className="stat-item">
                        <MessageCircle />
                        <span className="stat-count">{post.comments}</span>
                      </span>
                    </div>
                  </div>
                  <p className="post-content">{post.content}</p>
                </div>
              ))}
              {currentPosts.length === 0 && (
                <p className="no-posts-message">작성한 게시글이 없습니다.</p>
              )}
            </div>
            {totalPages > 1 && (
              <div className="pagination flex justify-center mt-8 space-x-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => this.setState({ currentPage: index + 1 })}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      currentPage === index + 1
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* 게시물 작성 모달 */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 className="modal-title">새 게시물 작성</h3>
              <form onSubmit={this.handlePostSubmit}>
                <textarea
                  className="modal-textarea"
                  placeholder="내용을 입력하세요..."
                  value={newPostContent}
                  onChange={(e) => this.setState({ newPostContent: e.target.value })}
                />
                <div className="modal-actions">
                  <button type="submit" className="btn-primary">
                    작성하기
                  </button>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => this.setState({ isModalOpen: false })}
                  >
                    취소
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default MainBoardPage;
