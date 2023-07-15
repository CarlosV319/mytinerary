import { combineReducers } from "redux";
import itineraryReducer from "./itineraryReducer";
import cityReducer from "./cityReducer";
import authReducer from "./authReducer";

const mainReducer = combineReducers({
  itineraryReducer,
  cityReducer,
  authReducer,
});
export default mainReducer;
