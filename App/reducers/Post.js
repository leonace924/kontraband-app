
const defaultState = {
  loading: false,
  postData: {},
  posts: [],
  tagsData: {},
  popularTags: [],
  mainCategories: [],
  mobileCategories: [],
  postDetailData: {},
  tags: [],
  tagsPages: {},
  params: {}
};

const Post = (state = defaultState, action) => {
  switch (action.type) {
    case 'REFRESH_POSTS_RECEIVED_SUCCESS':
      const p = (action.params.date == undefined || !action.params.date.length) ? {...action.params, date : state.params.date} : action.params;
      if (action.posts.posts == undefined)
        return Object.assign({}, state, {
          posts: [], params : p, loading: false
        });

      return Object.assign({}, state, {
        posts: action.posts.posts, params: action.params, loading: false
      });

    case 'POSTS_RECEIVED_SUCCESS':
      const params = (action.params.date == undefined || !action.params.date.length) ? {...action.params, date : state.params.date} : action.params;

      if (action.posts.posts !== undefined) {
        return Object.assign({}, state, {
          posts: [...state.posts, ...action.posts.posts], params, loading: false
        });
      }

      return Object.assign({}, state, {
        posts: state.posts, params, loading: false
      });

    case 'POPULAR_TAGS_RECEIVED_SUCCESS':
      return Object.assign({}, state, {
        popularTags: action.tags.tags, tagsData: action.tags
      });
    case 'TAGS_RECEIVED_SUCCESS':
      return Object.assign({}, state, {
        tags: action.tags.tags, tagsPages: action.tags.pagination
      });
    case 'ALL_TAGS_RECEIVED_SUCCESS':
      return Object.assign({}, state, {
        allTags: action.tags.tags
      });
    case 'CATEGORIES_RECEIVED_SUCCESS':
      return Object.assign({}, state, {
        mainCategories: action.categories.main, mobileCategories: action.categories.mobile
      });
    case 'POST_DETAIL_RECEIVED_SUCCESS':
      return Object.assign({}, state, {
        postDetail: action.postDetail, postDetailData: action.postDetail
      });
    case 'POPULAR_TREND_TAGS_RECEIVED_SUCCESS':
      return Object.assign({}, state, {
        popularTrendTags: action.tags.tags, popularTrendTagsData: action.tags
      });
    case 'TAGS_QUERY_RECEIVED_SUCCESS':
      return Object.assign({}, state, {
        queryTags: action.tags.tags, queryTagsData: action.tags
      });
    case 'COMMENTS_RECEIVED_SUCCESS':
      return Object.assign({}, state, {
        comments: action.comments
      });
    case 'POST_COMMENT_SUCCESS':
      return Object.assign({}, state, {
        postCommentSucceed: action.comment
      });
    case 'START_LOADING':
      return Object.assign({}, state, {
        loading: true
      });
    case 'VIEWABLE_POSTS':
      return Object.assign({}, state, {
        viewableList: action.viewableList
      });
    case 'ADD_DATE':
      return Object.assign({}, state, {
          initialDate: action.initialDate
        }
      )
    default:
      return state;
  }
};

export default Post;