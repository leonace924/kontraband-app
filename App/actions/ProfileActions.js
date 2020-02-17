export const fetchProfileDetails = () => ({
  type: 'FETCH_PROFILE_DETAILS'
});

export const fetchFollowing = () => ({
  type: 'FETCH_FOLLOWING',
});

export const fetchLikePosts = (params) => ({
  type: 'FETCH_LIKEPOSTS',
  params
});

export const updateProfile = (body) => ({
  type: 'UPDATE_PROFILE',
  body
});

export const updateFollowing = (tag) => ({
  type: 'UPDATE_FOLLOWING',
  tag
});

export const deleteUser = () => ({
  type: 'DELETE_USER'
});

