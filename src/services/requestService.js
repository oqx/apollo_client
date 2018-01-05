// @flow
import axios from "axios";
import { GOOGLE_GEO_API_KEY } from "../CONSTANTS";
import { GOOGLE_GEOCODE_API_KEY } from "../CONSTANTS";
import { SONGKICK_API_KEY } from "../CONSTANTS";
import { $requestEvents } from "../actions/loadingActions";
import { $uiApiErrorAlert } from "../actions/uiActions";
import { store } from "../index";

export async function fetchSongKickEvents(lat: number, lng: number): Object {
  const { dispatch } = store;
  dispatch($requestEvents());
  return axios
    .get(
      `https://api.songkick.com/api/3.0/events.json?apikey=${SONGKICK_API_KEY}&location=geo:${lat},${lng}`
    )
    .then(response => {
      return response.data.resultsPage.results.event;
    })
    .catch(err => {
      dispatch($uiApiErrorAlert("Events API Error", err.message));
      throw new Error(err.message);
    });
}

export async function geoCodeAddress(address: any) {
  const { dispatch } = store;
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_GEOCODE_API_KEY}`
    )
    .then(response => response)
    .catch(err => {
      dispatch($uiApiErrorAlert("GeoCode Error", err.message));
      throw new Error(err);
    });
}

export function geoLocateViaGoogleApi() {
  const { dispatch } = store;
  return axios({
    method: "post",
    url: `https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_GEO_API_KEY}`
  })
    .then(response => response)
    .catch(err => {
      dispatch($uiApiErrorAlert("Google Geolocation Error", err.message));
    });
}
