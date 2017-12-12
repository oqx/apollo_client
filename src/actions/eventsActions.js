// @flow

import axios from 'axios'
import { encodeQueryData,
         compose } from '../services/utilityService'
import { GOOGLE_GEO_API_KEY } from '../CONSTANTS'
import { geoCodeAddress,
				 setZoomByRadius,
         extractCoordinates } from '../services/geoService'
import * as eventsService	from '../services/eventsService'

const requestLocation = () => {
	return {
		type: 'REQUEST_LOCATION_PENDING'
	}
}

const requestLocationFailed = () => {
	return {
		type: 'REQUEST_LOCATION_REJECTED'
	}
}

const requestEvents = () => {
	return {
		type: 'REQUEST_EVENTS_PENDING'
	}
}

const noEventResults = (message) => {
	return {
		type: 'NO_EVENT_RESULTS',
		message
	}
}

const $eventsArrayCreated = (events, userCoordinates, radius, zoom) => {
	return {
		type: 'MAP_EVENTS_FULFILLED',
		events,
		userCoordinates,
		radius,
		zoom
	}
}

export const updateDateFilter = (range) => {
	return {
		type: 'UPDATE_DATE_FILTER',
		range
	}
}

const handleNoResults = () => {
  return {
      message: 'No Results',
      hasResults: false
    }
}

const dispatchRequestEvents = () => dispatch => dispatch(requestEvents())
const dispatchRequestLocationFailed = () => dispatch => dispatch(requestLocationFailed())
const dispatchRequestLocation = () => dispatch => dispatch(requestLocation())

const addCoordinatesAndRadiusToEvent = (event) => {
  return (radius: number) => {
    event = eventsService.addRadiusToEvent(event, radius)
    return (coordinates: Array<mixed>) => {
      event = eventsService.addUserCoordinatesToEvent(event, coordinates)
      return eventsService.addDistanceToEvent(event)
    }
  }
}

const filterInvalidEvents = compose(
    eventsService.filterNearbyEvents
  , eventsService.removeExpiredEvents
  , eventsService.removeTimelessEvents)

const fetchEvents = (userCoordinates, radius, formPayload) => {
	dispatchRequestEvents()
  return eventsService.fetchSongKickEvents(userCoordinates[0], userCoordinates[1])
    .then(res => {
      return res
        .map(show => addCoordinatesAndRadiusToEvent(show)(radius)(userCoordinates))
        .filter(filterInvalidEvents)
        .map(eventsService.mapResultsToArrayOfObjects)
    })
}

export function getResultsByCoordinates(r = 5) {
  return (dispatch) => {
    const radius = r
    const zoom = setZoomByRadius(radius)
    getLocation()
    .then(userCoordinates => {
      const fetchedEvents = fetchEvents(userCoordinates, radius)
      fetchedEvents.then(events => {
        dispatch($eventsArrayCreated(
          [].concat(events)
          , userCoordinates
          , radius
          , zoom ))
      })
    })
  }
}

export function getResultsByAddress(payload, r = 5) {
	return dispatch => {
    dispatchRequestEvents()
	  const radius = r
    const zoom = setZoomByRadius(radius)
    const address = encodeQueryData(payload)
    geoCodeAddress(address).then(geoObj => {
      debugger
      const coordinates = extractCoordinates(geoObj)
      const fetchedEvents = fetchEvents(coordinates, radius)
      if(geoObj.has_results) {
        fetchedEvents.then(events => {
          dispatch($eventsArrayCreated(
            [].concat(events)
            , coordinates
            , radius
            , zoom ))
        })
      } else {
        dispatch(noEventResults(geoObj.message))
      }
    })
	}
}

function getLocation() {
		return new Promise(resolve => {
			const addCoordinatesToLocalStorage = (latlngArray) => {
				//Add coordinates + timestamp to localstorage
				var localStorageObj = {
					location: latlngArray,
					timestamp: Date.now()
				}
				localStorage.setItem("coordinates", JSON.stringify(localStorageObj));
			}

			const success = (pos) => {
				const latlng = [
					pos.coords.latitude,
					pos.coords.longitude
				]
				addCoordinatesToLocalStorage(latlng)
				return resolve(latlng)
			}

			const error = (err) => {
				return axios({
					method: 'post',
					url: `https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_GEO_API_KEY}`
				}).then(results => {
					//Add coordinates + timestamp to localstorage
					const latlng = [
						results.data.location.lat,
						results.data.location.lng
					]
					addCoordinatesToLocalStorage(latlng)
					//Resolve promise/user coordinates
					return resolve(latlng)
				})
				.catch( err => {
					dispatchRequestLocationFailed();
					throw new Error(err.message)
				})
			}

			const options = {
				timeout: 10000,
				maximumAge: 5000
			}

			const fireGeolocator = () => {
				dispatchRequestLocation()
				return navigator
          .geolocation
          .getCurrentPosition(
              success
            , error
            , options
          )
			}

			//Check localstorage for coordinates
			const storedCoordinates = localStorage.getItem("coordinates")
			const stored = JSON.parse(storedCoordinates)

			if(storedCoordinates) {
				//If timestamp is older than x, get new coordinates
				if ((Date.now() - stored.timestamp) > 300000) {
					fireGeolocator()
				}	else {
					//else just use the 5min < coords.
					dispatchRequestLocation()
					resolve(stored.location)
				}
			} else if (navigator.geolocation) {
				fireGeolocator()
	    }
		})
}
