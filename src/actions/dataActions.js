// @flow
import {
  DISPATCH_NEW_EVENTS,
  DISPATCH_USER_COORDINATES,
  DISPATCH_SELECTED_RADIUS,
  DISPATCH_SELECTED_DATE_RANGE,
  DISPATCH_MAP_ZOOM
} from "../actionTypes";

import {
  $requestLocation,
  $requestEventsComplete,
  $requestLocationComplete
} from "./loadingActions";

import { $uiCloseAlert, $uiSetSidebarState } from "./uiActions";

import { encodeQueryData, compose } from "../services/utilityService";
import * as geoService from "../services/geoService";
import * as requestService from "../services/requestService";
import * as eventsService from "../services/eventsService";

import { store } from "../index";

const $dataEventsAction = (events: Object) => {
  return {
    type: DISPATCH_NEW_EVENTS,
    events
  };
};

const $dataUserCoordinatesAction = (user_coordinates: Array<number>) => {
  return {
    type: DISPATCH_USER_COORDINATES,
    user_coordinates
  };
};

const $dataRadiusAction = (radius: number) => {
  return {
    type: DISPATCH_SELECTED_RADIUS,
    radius
  };
};

const $dataZoomAction = (zoom: number) => {
  return {
    type: DISPATCH_MAP_ZOOM,
    zoom
  };
};

export const $dataUpdateDateFilter = (date_range: number) => {
  return {
    type: DISPATCH_SELECTED_DATE_RANGE,
    date_range
  };
};

const addValuesToEvent = compose(
  eventsService.addRadiusToEvent,
  eventsService.addDistanceToEvent,
  eventsService.addUserCoordinatesToEvent
);

const filterInvalidEvents = compose(
  eventsService.filterNearbyEvents,
  eventsService.removeExpiredEvents,
  eventsService.removeTimelessEvents
);

export async function fetchEvents(formPayload?: Object) {
  const { user_coordinates } = store.getState().data_reducer;
  let events = await requestService.fetchSongKickEvents(
    user_coordinates[0],
    user_coordinates[1]
  );
  events = events
    .map(addValuesToEvent)
    .filter(filterInvalidEvents)
    .map(eventsService.mapResultsToArrayOfObjects);
  return events;
}

const checkForCoordinates = () => {
  const { dispatch, getState } = store;
  const { user_coordinates } = getState().data_reducer;
  if (!!user_coordinates[0]) {
    fetchEvents().then((events: Array<Object>) => {
      dispatch($dataEventsAction(events));
      dispatch($requestEventsComplete());
    });
  }
};

export async function getResultsByCoordinates(radius: number = 5) {
  const { dispatch } = store;
  dispatch($requestLocation());
  dispatch($dataRadiusAction(radius));
  dispatch($dataZoomAction(geoService.setZoomByRadius(radius)));
  const userCoordinates = await geoService.geoLocator();
  dispatch($dataUserCoordinatesAction(userCoordinates));
  dispatch($requestLocationComplete());
  checkForCoordinates();
}

export function getResultsByAddress(payload: Object, radius: number = 5) {
  const { dispatch } = store;
  const address = encodeQueryData(payload);
  dispatch($requestLocation());
  dispatch($uiCloseAlert());
  requestService.geoCodeAddress(address).then(results => {
    if (results.status === 200) {
      const geoObj = geoService.createGeoCodeResultsStatus(results.data);
      if (geoObj) {
        const userCoordinates = geoService.extractCoordinates(geoObj);
        dispatch($dataUserCoordinatesAction(userCoordinates));
        dispatch($requestLocationComplete());
        fetchEvents().then(events => {
          dispatch($dataEventsAction(events));
          dispatch($requestEventsComplete());
          dispatch($uiSetSidebarState(false));
        });
      }
    }
  });
}
