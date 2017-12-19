import { Map } from "immutable";

const initialState = Map({
  dateRange: "Today"
});

function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_DATE_FILTER":
      return state.merge({
        dateRange: action.range
      });

    default:
      return state;
  }
}

export default eventsReducer;
