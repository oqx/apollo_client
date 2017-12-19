import { mocks } from "../mockResults";

let getMocks = new Promise((resolve, reject) => {
  let m = mocks;
  resolve(m.resultsPage.results.event);
});

export const fetchMockSongKickEvents = () => {
  return getMocks.then(res => {
    return res;
  });
};

export function getMockResultsByCoordinates(r = 5) {
  const radius = r;
  const userCoordinates = [44.96463, -93.276932];
  const zoom = setZoomByRadius(radius);
  return dispatch => {
    fetchEvents(userCoordinates, radius).then(events => {
      dispatch(mappedEvents([].concat(events), userCoordinates, radius, zoom));
    });
  };
}
