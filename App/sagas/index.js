import { all, fork } from 'redux-saga/effects';
import { postSaga } from './postSaga';
import { authSaga } from './authSaga';
import { profileSaga } from './profileSaga';

export default function* rootSaga() {
  yield all([
    fork(postSaga),
    fork(authSaga),
    fork(profileSaga)
  ])
}