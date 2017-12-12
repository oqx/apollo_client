import axios from 'axios'
import { GOOGLE_GEOCODE_API_KEY } from '../CONSTANTS'

export const getDistance = (lat1, lon1, lat2, lon2) => {
  const p = 0.017453292519943295,
  			c = Math.cos;
  let a = 0.5 - c((lat2 - lat1) * p) / 2 + c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p)) / 2;
  return (12742 * Math.asin(Math.sqrt(a))).toFixed(1)
}

//@PARAM string
//Submit an address as a string, as you would in a google search.
//I mean, it's google. :-)
export const geoCodeAddress = (address) => {
	return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_GEOCODE_API_KEY}`)
		.then(results => createGeoCodeResultsStatus(results.data))
}

export const extractCoordinates = (data) => {
  return [data.data.geometry.location.lat, data.data.geometry.location.lng]
}

const createGeoCodeResultsStatus = data => {
  if(data.status === 'OK') {
    return {has_results: true, data: data.results[0]}

  } else {

    if (data.status === 'INVALID_REQUEST') {
      return {
        has_results: false,
        message: 'No Results. Try another search.'
      }
    }
    else if (data.status === 'ZERO_RESULTS') {
      return {
        has_results: false,
        message: 'No Results. Try another search.'
      }
    }

    else if (data.status === 'OVER_QUERY_LIMIT') {
      return {
        has_results: false,
        message: 'Uh oh, daddy couldn\'t pay the bill. Please consider donating to keep this project alive.'
      }
    }
    else if (data.status === 'REQUEST_DENIED') {
      return {
        has_results: false,
        message: 'Aww man, you broke it! Please contact me to let me know.'
      }
    }
    else {
      return {
        has_results: false,
        message: 'Aww man, you broke it! Please contact me to let me know.'
      }
    }
  }
}

export const setZoomByRadius = (r) => {
	if (r === 1)
		return 15
	else if ((r >= 2) && (r <= 4))
		return 14
	else if ((r >= 5) && (r <= 9))
		return 13
	else if ((r >= 10) && (r <= 14))
		return 12
	else if ((r >= 15) && (r <= 19))
		return 12
	else if ((r >= 20) && (r <= 24))
		return 11
	else if ((r >= 25) && (r <= 29))
		return 10
	else if ((r >= 30) && (r <= 35))
		return 10
}
