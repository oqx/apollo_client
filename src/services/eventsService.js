import moment from "moment";
import { getDistance } from "./geoService";

export const checkIfShowIsValid = show => (!!show ? true : false);

export const filterNearbyEvents = show => {
  const isValid = checkIfShowIsValid(show);
  if (isValid && show.distance <= show.radius) {
    return Object.assign({}, show);
  }
};

export const addRadiusToEvent = (show, radius) => {
  return Object.assign({}, show, { radius: radius });
};

export const addUserCoordinatesToEvent = (show, coordinates) => {
  return Object.assign({}, show, {
    user_coordinates: { lat: coordinates[0], lng: coordinates[1] }
  });
};

export const addDistanceToEvent = show => {
  const d = getDistance(
    show.user_coordinates.lat,
    show.user_coordinates.lng,
    show.location.lat,
    show.location.lng
  );
  return Object.assign({}, show, { distance: d });
};

export const removeExpiredEvents = show => {
  const isValid = checkIfShowIsValid(show);
  if (
    isValid &&
    !!show.start.datetime &&
    moment(show.start.datetime).isAfter(Date.now())
  ) {
    return Object.assign({}, show);
  }
};

export const removeTimelessEvents = show => {
  const isValid = checkIfShowIsValid(show);
  if (isValid && !!show.start.datetime) {
    return Object.assign({}, show);
  }
};

export const mapResultsToArrayOfObjects = show => {
  return {
    id: show.id,
    type: show.type,
    date: show.start.datetime,
    artist: show.performance,
    venue: show.venue.displayName,
    radius: show.radius,
    latlng: [show.location.lat, show.location.lng],
    distance: Number.parseFloat(show.distance)
  };
};
