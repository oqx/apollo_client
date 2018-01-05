import { combineReducers } from "redux";
import data_reducer from "./dataReducer";
import loading_reducer from "./loadingReducer";
import ui_reducer from "./uiReducer";

const reducers = combineReducers({
  data_reducer,
  loading_reducer,
  ui_reducer
});

export default reducers;
