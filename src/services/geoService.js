// @flow
import * as requestService from "./requestService";

export const getDistance = (lat1: number, lon1: number, lat2: number, lon2:number) => {
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
  if (data.status === "OK") {
    return { has_results: true, data: data.results[0] };
  } else {
    if (data.status === "INVALID_REQUEST") {
      return {
        has_results: false,
        message: "No Results. Try another search."
      };
    } else if (data.status === "ZERO_RESULTS") {
      return {
        has_results: false,
        message: "No Results. Try another search."
      };
    } else if (data.status === "OVER_QUERY_LIMIT") {
      return {
        has_results: false,
        message:
          "Uh oh, daddy couldn't pay the bill. Please consider donating to keep this project alive."
      };
    } else if (data.status === "REQUEST_DENIED") {
      return {
        has_results: false,
        message: "Aww man, you broke it! Please contact me to let me know."
      };
    } else {
      return {
        has_results: false,
        message: "Aww man, you broke it! Please contact me to let me know."
      };
    }
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

export const geoLocator = (dispatchFailure: any => mixed): Object => {
  return new Promise((resolve, reject) => {

    const addCoordinatesToLocalStorage = (latlng: Array<number>) => {
      //Add coordinates + timestamp to localstorage
      type LocalStorageObj = {
        location: Array<number>,
        timestamp: number
      };
      
      var localStorageObj: LocalStorageObj = {
        location: latlng,
        timestamp: Date.now()
      };
      window.localStorage.setItem("coordinates", JSON.stringify(localStorageObj));
    };

    const success = (pos: Object) => {
      const latlng = [pos.coords.latitude, pos.coords.longitude];
      addCoordinatesToLocalStorage(latlng);
      return resolve(latlng);
    };

    const error = (err: Object) => {
      return requestService
        .geoLocateViaGoogleApi()
        .then(results => {
          //Add coordinates + timestamp to localstorage
          const latlng = [results.data.location.lat, results.data.location.lng];
          addCoordinatesToLocalStorage(latlng);
          //Resolve promise/user coordinates
          return resolve(latlng);
        })
        .catch(err => {
          return reject(err.message)
        });
    };

    type Options = {
        timeout: number,
        maximumAge: number,
        enableHighAccuracy: boolean
    };

    const options: Options = {
      timeout: 10000,
      maximumAge: 5000,
      enableHighAccuracy: true
    };

    const fireGeolocator = () => {
      return navigator.geolocation.getCurrentPosition(success, error, options);
    };

    //Check localstorage for coordinates
    let stored: any = JSON.parse(window.localStorage.getItem("coordinates"));

    if (stored) {
      //If timestamp is older than x, get new coordinates
      if (Date.now() - stored.timestamp > 300000) {
        fireGeolocator();
      } else {
        //else just use the 5min < coords.
        return resolve(stored.location);
      }
    } else if (navigator.geolocation) {
      fireGeolocator();
    }
  });
};
