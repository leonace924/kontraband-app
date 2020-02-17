import { put, takeLatest } from 'redux-saga/effects';
import { apiFetch, apiFetchPost } from "../utils/network";
import { constants } from "../constants";

function* fetchPosts(action) {
  yield put({ type: "START_LOADING" });
  const { params } = action;

  let parameters = `post?page=${params.page}`
  if (params.section) {
    parameters += `&section=${params.section}`;
  }
  if (params.tags) {
    parameters += `&tags=${params.tags}`;
  }
  if (params.date && params.date !== 'undefined') {
    parameters += `&date=${params.date}`;
  }

  if (params.section || params.tags) {
    let json = yield apiFetch(parameters, constants.accessToken)
      .then(resp => {
        return resp.json();
      });
    if (params.page == 1) {
      yield put({ type: "REFRESH_POSTS_RECEIVED_SUCCESS", posts: json, params: params });
    } else {
      yield put({ type: "POSTS_RECEIVED_SUCCESS", posts: json, params: params });
    }
  }
}

function* fetchTagsByQuery(action) {
  yield put({ type: "START_LOADING" });
  const { params } = action;
  const parameters = `search?&query=${params}&page=1`
  const json = yield apiFetch(parameters, constants.accessToken)
    .then(resp => resp.json())
    .then(result => {
      return result
    });
  yield put({ type: "TAGS_QUERY_RECEIVED_SUCCESS", tags: json, });
}

function* fetchTags(action) {
  const { popular } = action;
  const parameters = `tag?popular=${popular}`
  const json = yield apiFetch(parameters, constants.accessToken)
    .then(resp => {
      return resp.json();
    });
  if (popular === 1) {
    yield put({ type: "POPULAR_TAGS_RECEIVED_SUCCESS", tags: json, });
  } else if (popular === 0) {
    yield put({ type: "TAGS_RECEIVED_SUCCESS", tags: json, });
  }
}

function* fetchAllTags() {
  const parameters = `tag?`
  const json = yield apiFetch(parameters, constants.accessToken)
    .then(resp => {
      return resp.json();
    });
  yield put({ type: "ALL_TAGS_RECEIVED_SUCCESS", tags: json, });

}

function* fetchMenuCategories(action) {
  const parameters = `navigation?`
  const json = yield apiFetch(parameters, constants.accessToken)
    .then(resp => {
      return resp.json();
    });

  yield put({ type: "CATEGORIES_RECEIVED_SUCCESS", categories: json, });

}

function* fetchPostDetail(action) {
  const { params } = action;
  const parameters = `post/${params.slug}?`
  const json = yield apiFetch(parameters, constants.accessToken)
    .then(resp => {
      return resp.json();;
    });
  yield put({ type: "POST_DETAIL_RECEIVED_SUCCESS", postDetail: json });
}

function* fetchPopularTags(action) {
  const { page, limit, sort, popular } = action.params;
  const parameters = `tag?&page=${page}&limit=${limit}&sort=${sort}&popular=${popular}`
  const json = yield apiFetch(parameters, constants.accessToken)
    .then(resp => {
      return resp.json();
    });
  yield put({ type: "POPULAR_TAGS_RECEIVED_SUCCESS", tags: json, });
}

function* fetchComments(action) {
  const { slug, page, limit, start } = action.params;
  const parameters = `comment/${slug}?page=${page}&limit=${limit}&start=${start}`
  const json = yield apiFetch(parameters, constants.accessToken)
    .then(resp => resp.json())
    .then(result => {
      return result
    });
  yield put({ type: "COMMENTS_RECEIVED_SUCCESS", comments: json, });
}

function* postComment(action) {
  const json = yield apiFetchPost(`comment?token=${constants.token}`, action.params, constants.accessToken)
    .then(resp => {
      return resp.json();
    });

  yield put({ type: "POST_COMMENT_SUCCESS", comment: json });
}

export function* postSaga() {
  yield takeLatest('FETCH_POSTS', fetchPosts);
  yield takeLatest('FETCH_TAGS', fetchTags);
  yield takeLatest('FETCH_ALL_TAGS', fetchAllTags);
  yield takeLatest('FETCH_MENU_CATEGORIES', fetchMenuCategories);
  yield takeLatest('FETCH_POST_DETAIL', fetchPostDetail);
  yield takeLatest('FETCH_POPULAR_TAGS', fetchPopularTags);
  yield takeLatest('FETCH_TAGS_BY_QUERY', fetchTagsByQuery);
  yield takeLatest('FETCH_COMMENTS', fetchComments);
  yield takeLatest('POST_COMMENT', postComment);
} 
