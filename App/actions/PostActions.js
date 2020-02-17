import { currentDate } from '../utils/functions'

export const fetchPosts = (params) => ({
  type: 'FETCH_POSTS',
  params
});

export const fetchTags = (popular) => ({
  type: 'FETCH_TAGS',
  popular
});

export const fetchAllTags = (popular) => ({
  type: 'FETCH_ALL_TAGS',
  popular
});

export const fetchMenuCategories = () => ({
    type: 'FETCH_MENU_CATEGORIES',
});

export const fetchPostDetail = (params) => ({
    type: 'FETCH_POST_DETAIL',
    params
});

export const fetchPopularTags = (params) => ({
  type: 'FETCH_POPULAR_TAGS',
  params
});

export const fetchTagsByQuery = (params) => ({
  type: 'FETCH_TAGS_BY_QUERY',
  params
});

export const fetchFollowingTags = () => ({
  type: 'FETCH_FOLLOWING_TAGS',
});

export const fetchComments = (params) => ({
  type: 'FETCH_COMMENTS',
  params
});

export const postComment = (params) => ({
  type: 'POST_COMMENT',
  params
});

export function viewablePosts(viewableList) {
  return {
    type: 'VIEWABLE_POSTS',
    viewableList
  }
}

export function init() {
  return {
    type: 'ADD_DATE',
    initialDate: currentDate()
  }
}



