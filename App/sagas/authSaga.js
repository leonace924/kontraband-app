
import { put, takeLatest } from 'redux-saga/effects';
import { apiFetchPost } from "../utils/network";
import { constants } from "../constants";

function* signUpUser(body) {
  const json = yield apiFetchPost('user', body.body)
    .then(resp => {
      constants.accessToken = resp.headers.map.authorization;
      return resp.json();
    });
  yield put({ type: "DATA_RECEIVED", json: json, });
}

function* loggedInUser(body) {
  yield put({ type: "USER_LOGIN", json: json, });
  const json = yield apiFetchPost('user/sign_in', body.body)
    .then(resp => {
      constants.accessToken = resp.headers.map.authorization;
      return resp.json();
    });

  yield put({ type: "LOGIN_DATA_RECEIVED", json: json, });
}

function* onSocialLogin(body) {
  const token = yield apiFetchPost(`user/social-login?token=${constants.token}`, body.body)
    .then(resp => resp.text())
    .then(token => {
      constants.accessToken = 'Bearer ' + token
      return 'Bearer ' + token
    })
  yield put({ type: "SOCIAL_LOGIN_DATA_RECEIVED", json: token, });
}

function* logOutUser() {
  yield put({ type: "START_LOADING" });
  const json = yield apiFetchPost('user/sign_out', constants.accessToken, '')
    .then(resp => {
      constants.accessToken = ''
    });
  yield put({ type: "LOGOUT_USER_SUCCESS" });
}

export function* authSaga() {
  yield takeLatest('SIGNUP_USER', signUpUser);
  yield takeLatest('LOGIN_USER', loggedInUser);
  yield takeLatest('LOGIN_SOCIAL', onSocialLogin);
  yield takeLatest('LOGOUT_USER', logOutUser);
}
