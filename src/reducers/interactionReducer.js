const initialState = {
  sidebarState: true
};

function interactionReducer(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        sidebarState: action.sidebarState
      };

    default:
      return state;
  }
}

export default interactionReducer;
