import { combineReducers } from "redux";
import contactReducers from "./contactReducers";

const rootReducers = combineReducers({
  contact: contactReducers
})

export default rootReducers;