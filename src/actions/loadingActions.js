import {
  REQUEST_LOCATION_PENDING,
  REQUEST_LOCATION_COMPLETE,
  REQUEST_EVENTS_PENDING,
  REQUEST_EVENTS_COMPLETE,
  REQUEST_RADIUS_UPDATE_PENDING,
  REQUEST_RADIUS_UPDATE_COMPLETE
} from "../actionTypes";

export const $requestLocation = () => {
  return {
    type: REQUEST_LOCATION_PENDING
  };
};

export const $requestLocationComplete = () => {
  return {
    type: REQUEST_LOCATION_COMPLETE
  };
};

export const $requestEvents = () => {
  return {
    type: REQUEST_EVENTS_PENDING
  };
};

export const $requestEventsComplete = () => {
  return {
    type: REQUEST_EVENTS_COMPLETE
  };
};

export const $requestRadiusUpdate = () => {
  return {
    type: REQUEST_RADIUS_UPDATE_PENDING
  };
};

export const $requestRadiusUpdateComplete = () => {
  return {
    type: REQUEST_RADIUS_UPDATE_COMPLETE
  };
};
