import { combineReducers } from "redux";
import userDetailsReducer from "./usersDetails";

const rootReducer = combineReducers({
  user: userDetailsReducer,
});

export default rootReducer;
