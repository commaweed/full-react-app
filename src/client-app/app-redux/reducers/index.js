import { combineReducers } from "redux";

import searchFormStore from "./searchFormReducer";
import colorsStore from "./colorsReducer";

export default combineReducers({
   colorsStore,
   searchFormStore
})