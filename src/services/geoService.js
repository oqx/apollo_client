// @flow
import * as requestService from "./requestService";
import { $uiApiErrorAlert } from "../actions/uiActions";
import { store } from "../index";

export const getDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const p = 0.017453292519943295,
    c = Math.cos;
  let a =
    0.5 -
    c((lat2 - lat1) * p) / 2 +
    c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p)) / 2;
  return parseFloat((12742 * Math.asin(Math.sqrt(a))).toFixed(1));
};

export const extractCoordinates = (data: Object): Array<number> => {
  return [data.data.geometry.location.lat, data.data.geometry.location.lng];
};

export const createGeoCodeResultsStatus = (data: Object) => {
  const { dispatch } = store;
  switch(data.status) {
    case "OK": return { data: data.results[0] };
    case "ZERO_RESULTS":
    case "INVALID_REQUEST":
      dispatch($uiApiErrorAlert("Address Error", "Address could not be found. Please enter a different address."));
      break;
    case "REQUEST_DENIED":
    case "OVER_QUERY_LIMIT":
    default:
      dispatch($uiApiErrorAlert("Geocode Error", "Uh oh, I'm experiencing issues geocoding addresses. Please let me know at support@apolloatlas.com."));
      break;

  }
};

export const setZoomByRadius = (r: number): number => {
  if (r === 1) return 15;
  else if (r >= 2 && r <= 4) return 14;
  else if (r >= 5 && r <= 9) return 13;
  else if (r >= 10 && r <= 14) return 12;
  else if (r >= 15 && r <= 19) return 12;
  else if (r >= 20 && r <= 24) return 11;
  else if (r >= 25 && r <= 29) return 10;
  else if (r >= 30 && r <= 35) return 10;
  return 7;
};

export const geoLocator = (): Object => {
  return new Promise((resolve, reject) => {
    type Options = {
      timeout: number,
      maximumAge: number,
      enableHighAccuracy: boolean
    };

    let options: Options = {
      timeout: 10000,
      maximumAge: 5000,
      enableHighAccuracy: true
    };

    let success = (pos: Object) => {
      const latlng = [pos.coords.latitude, pos.coords.longitude];
      addCoordinatesToLocalStorage(latlng);
      resolve(latlng);
    };

    let error = async (err: Object) => {
      let results = await requestService.geoLocateViaGoogleApi();
      if (results) {
        //Add coordinates + timestamp to localstorage
        const latlng = [results.data.location.lat, results.data.location.lng];
        addCoordinatesToLocalStorage(latlng);
        //Resolve promise/user coordinates
        resolve(latlng);
      }
    };

    let fireGeolocator = () => {
      return navigator.geolocation.getCurrentPosition(success, error, options);
    };

    let addCoordinatesToLocalStorage = (latlng: Array<number>) => {
      //Add coordinates + timestamp to localstorage
      type LocalStorageObj = {
        location: Array<number>,
        timestamp: number
      };

      var localStorageObj: LocalStorageObj = {
        location: latlng,
        timestamp: Date.now()
      };
      window.localStorage.setItem(
        "coordinates",
        JSON.stringify(localStorageObj)
      );
    };

    //Check localstorage for coordinates
    let stored: any = JSON.parse(window.localStorage.getItem("coordinates"));

    if (stored) {
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
};
