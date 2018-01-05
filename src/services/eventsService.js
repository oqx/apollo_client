// @flow
import moment from "moment";
import { getDistance } from "./geoService";
import { $uiNoEventsAlert } from "../actions/uiActions";
import { store } from "../index";

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

export const addRadiusToEvent = (show: Object): Object => {
  return { ...show, radius: store.getState().data_reducer.radius };
};

export const addUserCoordinatesToEvent = (show: Object): Object => {
  return {
    ...show,
    user_coordinates: {
      lat: store.getState().data_reducer.user_coordinates[0],
      lng: store.getState().data_reducer.user_coordinates[1]
    }
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

export const handleNoEvents = (events: Array<any>) => {
  const currentShows = _filterShowsBySelectedDate(events);
  if (currentShows.length === 0) {
    store.dispatch($uiNoEventsAlert());
    return null;
  }
  return [].concat(currentShows);
};

const _filterShowsBySelectedDate = shows => {
  if (shows.length === 0) {
    return [];
  }

  const endOfDay = moment()
      .endOf("day")
      .format(),
    endOfTomorrow = moment(endOfDay)
      .add(24, "hours")
      .format(),
    dateRange = store.getState().data_reducer.date_range;

  return shows
    .filter(show => {
      if (dateRange === "Today") {
        return show.date < endOfDay;
      } else {
        return show.date > endOfDay && show.date < endOfTomorrow;
      }
    })
};
