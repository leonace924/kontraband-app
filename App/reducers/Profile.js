const defaultState = {
  followingTagsCount: {},
  followingTagsList: [],
  likesPostList: { posts: [] },
  updateProfileSuccess: false,
  deleteMyself: false,
  userDetail: {}
};

const Profile = (state = defaultState, action) => {
  switch (action.type) {
    case 'USER_DETAIL_RECEIVED_SUCCESS':
      return { ...state, userDetail: action.userDetail };
    case 'FOLLOWING_RECEIVED_SUCCESS':
      return {
        ...state,
        followingTagsCount: action.following.pagination,
        followingTagsList: action.following.tags
      };

    case 'LIKEPOSTS_RECEIVED_SUCCESS':
      return {
        ...state,
        likesPostList: action.posts
      }
    case 'UPDATE_PROFILE_SUCCESS':
      return {
        ...state,
        likesPostList: action.posts
      }
    case 'UPDATE_FOLLOWING_SUCCESS':
      return {
        ...state,
        updateFollowingSucceed: action.status
      }

    case 'DELETE_USER_SUCCESS':
      return {
        ...state,
        deleteMyself: true
      }
    default:
      return state;
  }
};

export default Profile;