import React, { Component } from 'react';
import { User, Mail, Calendar, ArrowLeft, Edit, Trash2, Eye, Heart, MessageCircle } from 'lucide-react';
import CommonLayout from './CommonLayout';
import "../styles/MyPage.css"

class MyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      userPosts: [],
      isLoading: true,
      error: null
    };
  }

    // Lifecycle method to populate state with sample data or fetch from API
  componentDidMount() {
    // 사용자 정보 설정
    if (this.props.currentUser) {
      this.setState({ userInfo: this.props.currentUser });
    }

    // 샘플 데이터로 상태를 초기화합니다.
    this.initializeWithSamplePosts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentUser !== this.props.currentUser) {
      this.setState({ userInfo: this.props.currentUser });
    }
  }

  // 샘플 게시글 데이터로 상태를 초기화하는 메서드
  initializeWithSamplePosts = () => {
    // 여기에 샘플 게시글 데이터를 넣습니다.
    const samplePosts = [
      {
        id: '1',
        category: '공지사항',
        title: '새로운 서비스 기능 업데이트 안내',
        created_at: new Date('2025-08-01T10:00:00Z'),
        view_count: 120,
        like_count: 5,
        comment_count: 3
      },
      {
        id: '2',
        category: '자유게시판',
        title: '주말에 캠핑 다녀왔어요!',
        created_at: new Date('2025-07-28T15:30:00Z'),
        view_count: 45,
        like_count: 12,
        comment_count: 7
      },
      {
        id: '3',
        category: '질문/답변',
        title: 'React Hooks 사용법에 대해 궁금합니다.',
        created_at: new Date('2025-07-25T09:15:00Z'),
        view_count: 88,
        like_count: 2,
        comment_count: 4
      },
      {
        id: '4',
        category: '정보공유',
        title: '요즘 핫한 영화 리스트',
        created_at: new Date('2025-07-20T18:45:00Z'),
        view_count: 250,
        like_count: 25,
        comment_count: 15
      },
    ];

    // isLoading 상태를 false로 설정하고 userPosts에 샘플 데이터를 할당합니다.
    this.setState({
      userPosts: samplePosts,
      isLoading: false
    });
  };

  // componentDidMount() {
  //   // 사용자 정보 설정
  //   if (this.props.currentUser) {
  //     this.setState({ userInfo: this.props.currentUser });
  //   }
  //   // 사용자가 작성한 글 가져오기
  //   this.fetchUserPosts();
  // }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.currentUser !== this.props.currentUser) {
  //     this.setState({ userInfo: this.props.currentUser });
  //   }
  // }

  // // 사용자가 작성한 글 가져오기
  // fetchUserPosts = async () => {
  //   try {
  //     const { currentUser } = this.props;
  //     if (!currentUser?.sub) {
  //       this.setState({ isLoading: false });
  //       return;
  //     }

  //     // 백엔드에서 사용자가 작성한 글 가져오기
  //     const response = await fetch(`http://localhost:5000/api/v1/posts?author_id=${currentUser.sub}`);
  //     if (response.ok) {
  //       const data = await response.json();
  //       const posts = data.posts || data.data || [];
  //       this.setState({ 
  //         userPosts: posts,
  //         isLoading: false 
  //       });
  //     } else {
  //       throw new Error('게시글을 가져오는데 실패했습니다.');
  //     }
  //   } catch (error) {
  //     console.error('사용자 게시글 로드 오류:', error);
  //     this.setState({ 
  //       error: error.message,
  //       isLoading: false 
  //     });
  //   }
  // };

  handleBack = () => {
    this.props.navigate('/');
  };

  handleEditPost = (postId) => {
    this.props.navigate(`/write?edit=${postId}`);
  };

  handleDeletePost = async (postId) => {
    if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/posts/${postId}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          // 삭제 성공 시 목록에서 제거
          this.setState(prevState => ({
            userPosts: prevState.userPosts.filter(post => post.id !== postId)
          }));
          alert('게시글이 삭제되었습니다.');
        } else {
          throw new Error('게시글 삭제에 실패했습니다.');
        }
      } catch (error) {
        console.error('게시글 삭제 오류:', error);
        alert('게시글 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  render() {
    const { userInfo, userPosts, isLoading, error } = this.state;
    const { currentUser, isLoggedIn } = this.props;

    // 사용자 정보가 없으면 로딩 표시
    if (!userInfo && !currentUser) {
      return (
        <CommonLayout
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          navigate={this.props.navigate}
        >
          <div className="auth-page">
            <div className="auth-container">
              <div className="loading"></div>
              <p>사용자 정보를 불러오는 중...</p>
            </div>
          </div>
        </CommonLayout>
      );
    }

    const user = userInfo || currentUser;

    return (
      <CommonLayout
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        navigate={this.props.navigate}
        hideSidebar={true} // 마이페이지에서만 사이드바 숨기기
      >
        <div className="mypage-container">
          {/* 뒤로가기 버튼을 제목 아래에 */}
          <div className="back-button-container">
            <button 
              onClick={this.handleBack}
              className="mypage-back-button"
            >
              <ArrowLeft size={20} />
              뒤로가기
            </button>
          </div>

          {/* 제목 먼저 가운데에 */}
          <div className="mypage-header">
            <h1 className="mypage-title">마이페이지</h1>
          </div>

          

          <div className="mypage-content">
            {/* 사용자 정보 섹션 */}
            <div className="user-info-section">
              <div className="user-profile-card">
                <div className="profile-image">
                  <div className="profile-avatar">
                    {user?.username?.charAt(0)?.toUpperCase() || 
                     user?.sub?.charAt(0)?.toUpperCase() || 
                     user?.email?.charAt(0)?.toUpperCase() || 
                     'U'}
                  </div>
                </div>
                
                <div className="profile-details">
                  <h2 className="profile-name">
                    {user?.username || user?.sub || '사용자'}
                  </h2>
                  <p className="profile-email">
                    {user?.email || '이메일 정보 없음'}
                  </p>
                </div>
              </div>
            </div>

            {/* 사용자가 작성한 글 섹션 */}
            <div className="user-posts-section">
              <h3 className="section-title">내가 작성한 글</h3>
              
              {isLoading ? (
                <div className="loading">로딩 중...</div>
              ) : error ? (
                <div className="error">오류: {error}</div>
              ) : userPosts.length === 0 ? (
                <div className="no-posts">작성한 게시글이 없습니다.</div>
              ) : (
                <div className="my-posts-table">
                  {/* 테이블 헤더 */}
                  <div className="my-table-header">
                      <div className="my-header-cell">카테고리</div>
                      <div className="my-header-cell">제목</div>
                      <div className="my-header-cell">작성날짜</div>
                      <div className="my-header-cell">조회수</div>
                      <div className="my-header-cell">좋아요</div>
                      <div className="my-header-cell">댓글</div>
                      <div className="my-header-cell">작업</div>
                  </div>

                  {/* 테이블 본문 */}
                  <div className="my-table-body">
                    {userPosts.map(post => (
                      <div key={post.id} className="my-table-row">
                        <div className="my-table-cell category-cell">
                          <span className="my-category-tag">{post.category || '미분류'}</span>
                        </div>
                        <div className="my-table-cell title-cell">
                          <span className="my-post-title">{post.title}</span>
                        </div>
                        <div className="my-table-cell date-cell">
                          {new Date(post.created_at).toLocaleDateString('ko-KR')}
                        </div>
                        <div className="my-table-cell views-cell">
                          {post.view_count || 0}
                        </div>
                        <div className="my-table-cell likes-cell">
                          {post.like_count || 0}
                        </div>
                        <div className="my-table-cell comments-cell">
                          {post.comment_count || 0}
                        </div>
                        <div className="my-table-cell actions-cell">
                          <div className="my-actions-cell">
                            <button 
                              className="action-btn edit"
                              onClick={() => this.handleEditPost(post.id)}
                              title="수정"
                            >
                              <Edit size={16} />
                            </button>
                            <button 
                              className="action-btn delete"
                              onClick={() => this.handleDeletePost(post.id)}
                              title="삭제"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CommonLayout>
    );
  }
}

export default MyPage;
