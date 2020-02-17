import { combineReducers } from "redux";

import Auth from "./Auth";
import Post from "./Post";
import Profile from './Profile';

const rootReducer = combineReducers({
  Auth,
  Post,
  Profile,
});

export default rootReducer;
