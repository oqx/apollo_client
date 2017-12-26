import { combineReducers } from "redux";
import eventsReducer from "./eventsReducer";
import appStatusReducer from "./appStatusReducer";
import interactionReducer from "./interactionReducer";

const reducers = combineReducers({
  eventsReducer,
  appStatusReducer,
  interactionReducer
});

export default reducers;
