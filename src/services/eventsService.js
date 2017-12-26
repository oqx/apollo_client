// @flow

import moment from "moment";
import { getDistance } from "./geoService";

type Event = {
  id: number,
  type: string,
  date: number,
  artist: Array<string>,
  venue: string,
  radius: number,
  latlng: Array<number>,
  distance: number
};

export const filterNearbyEvents = (show: Object): mixed => {
  if (show && show.distance <= show.radius) {
    return { ...show };
  }
};

export const addRadiusToEvent = (show: Object, radius: number): Object => {
  return { ...show, radius: radius };
};

export const addUserCoordinatesToEvent = (
  show: Object,
  coordinates: Array<number>
): Object => {
  return {
    ...show,
    user_coordinates: { lat: coordinates[0], lng: coordinates[1] }
  };
};

export const addDistanceToEvent = (show: Object): Object => {
  const d: number = getDistance(
    show.user_coordinates.lat,
    show.user_coordinates.lng,
    show.location.lat,
    show.location.lng
  );
  return { ...show, distance: d };
};

export const removeExpiredEvents = (show: Object) => {
  if (
    show &&
    !!show.start.datetime &&
    moment(show.start.datetime).isAfter(Date.now())
  ) {
    return { ...show };
  }
};

export const removeTimelessEvents = (show: Object) => {
  if (show && !!show.start.datetime) {
    return { ...show };
  }
};

export const mapResultsToArrayOfObjects = (show: Object): Object => {
  let event: Event = {
    id: show.id,
    type: show.type,
    date: show.start.datetime,
    artist: show.performance,
    venue: show.venue.displayName,
    radius: show.radius,
    latlng: [show.location.lat, show.location.lng],
    distance: show.distance
  };
  return event;
};
