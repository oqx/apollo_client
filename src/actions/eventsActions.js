// @flow

import { encodeQueryData, compose } from "../services/utilityService";
import {
  setZoomByRadius,
  extractCoordinates,
  createGeoCodeResultsStatus,
  geoLocator
} from "../services/geoService";
import * as requestService from "../services/requestService";
import * as eventsService from "../services/eventsService";

const $requestLocation = () => {
  return {
    type: "REQUEST_LOCATION_PENDING"
  };
};

const $requestLocationFailed = () => {
  return {
    type: "REQUEST_LOCATION_REJECTED"
  };
};

const $requestEvents = () => {
  return {
    type: "REQUEST_EVENTS_PENDING"
  };
};

const $noEventResults = (message: string) => {
  return {
    type: "NO_EVENT_RESULTS",
    message
  };
};

const $eventsArrayCreated = (events, userCoordinates, radius, zoom) => {
  return {
    type: "MAP_EVENTS_FULFILLED",
    events,
    userCoordinates,
    radius,
    zoom
  };
};

export const updateDateFilter = (range: number) => {
  return {
    type: "UPDATE_DATE_FILTER",
    range
  };
};

// Bound Action Creators
const dispatchRequestLocationFailed = () => (dispatch: any => void) =>
  dispatch($requestLocationFailed());
const dispatchRequestEvents = () => (dispatch: any => void) =>
  dispatch($requestEvents());

const addCoordinatesAndRadiusToEvent = (event: Object) => {
  return (radius: number) => {
    event = eventsService.addRadiusToEvent(event, radius);
    return (coordinates: Array<number>) => {
      event = eventsService.addUserCoordinatesToEvent(
        event,
        coordinates
      );
      return eventsService.addDistanceToEvent(event);
    };
  };
};

const filterInvalidEvents = compose(
  eventsService.filterNearbyEvents,
  eventsService.removeExpiredEvents,
  eventsService.removeTimelessEvents
);

export async function fetchEvents(
  userCoordinates: Array<number>,
  radius: number,
  formPayload?: Object
) {
  dispatchRequestEvents();
  const events = await requestService.fetchSongKickEvents(
    userCoordinates[0],
    userCoordinates[1]
  );
  return events
    .map(show => addCoordinatesAndRadiusToEvent(show)(radius)(userCoordinates))
    .filter(filterInvalidEvents)
    .map(eventsService.mapResultsToArrayOfObjects);
}

export function getResultsByCoordinates(radius: number = 5) {
  const zoom = setZoomByRadius(radius);
  return (dispatch: any => void) => {
    dispatch($requestLocation());
    geoLocator(dispatchRequestLocationFailed).then(userCoordinates => {
      dispatch($requestEvents());
      fetchEvents(userCoordinates, radius).then(events => {
        dispatch($eventsArrayCreated(events, userCoordinates, radius, zoom));
      });
    });
  };
}

export function getResultsByAddress(payload: Object, radius: number = 5) {
  const zoom = setZoomByRadius(radius);
  const address = encodeQueryData(payload);
  return (dispatch: any => void) => {
    dispatch($requestLocation());
    requestService.geoCodeAddress(address).then(results => {
      let geoObj = createGeoCodeResultsStatus(results.data);
      dispatch($requestEvents());
      let coordinates = extractCoordinates(geoObj);
      if (geoObj.has_results) {
        fetchEvents(coordinates, radius).then(events => {
          dispatch(
            $eventsArrayCreated([].concat(events), coordinates, radius, zoom)
          );
        });
      } else {
        dispatch($noEventResults(geoObj.message));
      }
    });
  };
}
