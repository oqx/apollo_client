const initialState = {
  dateRange: "Today",
  eventsModalOpen: false
};

function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_DATE_FILTER":
      return {
        ...state,
        dateRange: action.range
      };

    case "OPEN_EVENTS_MODAL":
      return {
        ...state,
        eventModalIsOpen: true,
        event: action.event
      };

    case "CLOSE_EVENTS_MODAL":
      return {
        ...state,
        eventModalIsOpen: false,
        event: {
          venue: null,
          date: null,
          distance: null,
          artist: [
            {
              displayName: null,
              id: null
            }
          ],
          latlng: [null, null],
          id: null
        }
      };

    default:
      return state;
  }
}

export default eventsReducer;

