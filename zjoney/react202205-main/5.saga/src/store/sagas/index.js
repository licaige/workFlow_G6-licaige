import { take, put, fork, takeEvery, call, cps, all, delay, cancel } from '../../redux-saga/effects';
import * as types from '../action-types'

function* add() {
  while (true) {
    yield delay(1000);
    yield put({ type: types.ADD });
  }
}

function* addWatcher() {
  const task = yield fork(add);
  yield take(types.STOP_ADD);
  yield cancel(task);
}

function* rootSaga() {
  yield addWatcher();
}

export default rootSaga;