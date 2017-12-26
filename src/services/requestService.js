// @flow
import axios from "axios";
import { GOOGLE_GEO_API_KEY } from "../CONSTANTS";
import { GOOGLE_GEOCODE_API_KEY } from "../CONSTANTS";
import { SONGKICK_API_KEY } from "../CONSTANTS";

export async function fetchSongKickEvents(lat: number, lng: number): Object {
  try {
    const response: Object = await axios(
      `https://api.songkick.com/api/3.0/events.json?apikey=${SONGKICK_API_KEY}&location=geo:${lat},${lng}`
    );
    return response.data.resultsPage.results.event;
  } catch (err) {
    throw new Error(err);
  }
}

export async function geoCodeAddress(address: any) {
  console.log(address)
  try {
    const response: Object = await axios(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_GEOCODE_API_KEY}`
    );
    return response;
  } catch (err) {
    throw new Error(err);
  }
}

export const geoLocateViaGoogleApi = () => {
  return axios({
    method: "post",
    url: `https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_GEO_API_KEY}`
  });
};
