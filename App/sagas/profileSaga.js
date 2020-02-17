import { put, takeLatest } from 'redux-saga/effects';
import { apiFetch, apiFetchPatch, apiFetchPost } from "../utils/network";
import { constants } from "../constants";

function* fetchProfileDetails() {
  const parameters = `user/details?`
  const json = yield apiFetch(parameters, constants.accessToken)
    .then(resp => {
      return resp.json();
    });
  yield put({ type: "USER_DETAIL_RECEIVED_SUCCESS", userDetail: json, });
}

function* fetchFollowing() {
  const parameters = `user/following?`
  const json = yield apiFetch(parameters, constants.accessToken)
    .then(resp => {
      return resp.json();
    });
  yield put({ type: "FOLLOWING_RECEIVED_SUCCESS", following: json, });
}

function* fetchLikePosts({ page }) {
  const parameters = `user/likes?page=${page}`
  const json = yield apiFetch(parameters, constants.accessToken)
    .then(resp => {
      return resp.json();
    });
  yield put({ type: "LIKEPOSTS_RECEIVED_SUCCESS", posts: json });
}

function* updateProfile(body) {
  const json = yield apiFetchPatch('user/details', body.body, constants.accessToken)
    .then(resp => {
      return resp.json();
    });
  yield put({ type: "UPDATE_PROFILE_SUCCESS", ok: json.status == 'ok' });
}

function* updateFollowing(action){
  const json = yield apiFetchPost(`tag/follow/${action.tag}?token=${constants.token}`,'',constants.accessToken)
    .then(resp => {
      return resp.json();
    });
   
  yield put({ type: "UPDATE_FOLLOWING_SUCCESS", status: json });
}

function* deleteUser() {
  const parameters = `user/delete?`
  const json = yield apiFetch(parameters, constants.accessToken, '')
    .then(resp => {
      return resp.json();
    });
  yield put({ type: "DELETE_USER_SUCCESS" });
}

export function* profileSaga() {
  yield takeLatest('FETCH_PROFILE_DETAILS', fetchProfileDetails);
  yield takeLatest('FETCH_FOLLOWING', fetchFollowing);
  yield takeLatest('FETCH_LIKEPOSTS', fetchLikePosts);
  yield takeLatest('UPDATE_PROFILE', updateProfile);
  yield takeLatest('UPDATE_FOLLOWING', updateFollowing);
  yield takeLatest('DELETE_USER', deleteUser);
} 