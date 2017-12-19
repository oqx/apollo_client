// @flow

import { encodeQueryData, compose } from "../services/utilityService";
import {
  setZoomByRadius,
  extractCoordinates,
  createGeoCodeResultsStatus
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

const $noEventResults = message => {
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

export const updateDateFilter = range => {
  return {
    type: "UPDATE_DATE_FILTER",
    range
  };
};

// Bound Action Creators
const dispatchRequestLocationFailed = () => dispatch =>
  dispatch($requestLocationFailed());
const dispatchRequestEvents = () => dispatch => dispatch($requestEvents());

const addCoordinatesAndRadiusToEvent = event => {
  return (radius: number) => {
    event = eventsService.addRadiusToEvent(event, radius);
    return (coordinates: Array<mixed>) => {
      event = eventsService.addUserCoordinatesToEvent(event, coordinates);
      return eventsService.addDistanceToEvent(event);
    };
  };
};

const filterInvalidEvents = compose(
  eventsService.filterNearbyEvents,
  eventsService.removeExpiredEvents,
  eventsService.removeTimelessEvents
);

export async function fetchEvents(userCoordinates, radius, formPayload) {
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

export function getResultsByCoordinates(radius = 5) {
  const zoom = setZoomByRadius(radius);
  return dispatch => {
    dispatch($requestLocation());
    getLocation().then(userCoordinates => {
      dispatch($requestEvents());
      fetchEvents(userCoordinates, radius).then(events => {
        dispatch($eventsArrayCreated(events, userCoordinates, radius, zoom));
      });
    });
  };
}

export function getResultsByAddress(payload, radius = 5) {
  const zoom = setZoomByRadius(radius);
  const address = encodeQueryData(payload);
  return dispatch => {
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

function getLocation() {
  return new Promise(resolve => {
    const addCoordinatesToLocalStorage = latlngArray => {
      //Add coordinates + timestamp to localstorage
      var localStorageObj = {
        location: latlngArray,
        timestamp: Date.now()
      };
      localStorage.setItem("coordinates", JSON.stringify(localStorageObj));
    };

    const success = pos => {
      const latlng = [pos.coords.latitude, pos.coords.longitude];
      addCoordinatesToLocalStorage(latlng);
      return resolve(latlng);
    };

    const error = err => {
      requestService
        .geoLocateViaGoogleApi()
        .then(results => {
          //Add coordinates + timestamp to localstorage
          const latlng = [results.data.location.lat, results.data.location.lng];
          addCoordinatesToLocalStorage(latlng);
          //Resolve promise/user coordinates
          return resolve(latlng);
        })
        .catch(err => {
          dispatchRequestLocationFailed();
          throw new Error(err.message);
        });
    };

    const options = {
      timeout: 10000,
      maximumAge: 5000
    };

    const fireGeolocator = () => {
      return navigator.geolocation.getCurrentPosition(success, error, options);
    };

    //Check localstorage for coordinates
    const storedCoordinates = localStorage.getItem("coordinates");
    const stored = JSON.parse(storedCoordinates);

    if (storedCoordinates) {
      //If timestamp is older than x, get new coordinates
      if (Date.now() - stored.timestamp > 300000) {
        fireGeolocator();
      } else {
        //else just use the 5min < coords.
        resolve(stored.location);
      }
    } else if (navigator.geolocation) {
      fireGeolocator();
    }
  });
}
