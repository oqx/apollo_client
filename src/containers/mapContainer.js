import React from "react";
import { connect } from "react-redux";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { divIcon } from "leaflet";
import moment from "moment";
import { MAP_TILES, MAP_ATTR } from "../CONSTANTS";
import { getResultsByCoordinates } from "../actions/eventsActions";
import MapMarkerComponent from "../components/mapMarkerComponent";

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    this.userIcon = divIcon({
      className: "ion-android-navigate icon__navigator "
    });
    this.mapMarker = divIcon({
      className: "icon__marker"
    });
    this.filterEventsByDay = this.filterEventsByDay.bind(this);
  }

  componentDidMount() {
    const { dispatch, radius } = this.props;
    dispatch(getResultsByCoordinates(radius));
    // dispatch(getMockResultsByCoordinates(radius))
  }

  filterEventsByDay(event) {
    const eod = moment().endOf("day"),
      endOfDay = moment(eod).format(),
      eot = moment(eod).add(24, "hours"),
      endOfTomorrow = moment(eot).format(),
      { dateRange } = this.props;

    if (!!event.date) {
      if (dateRange === "Today") {
        return event.date < endOfDay;
      } else if (dateRange === "Tomorrow") {
        return event.date > endOfDay && event.date < endOfTomorrow;
      } else {
        return false;
      }
    }
  }

  render() {
    const { appIsLoading, events, userCoordinates, zoom } = this.props;

    return (
      <div className="structure@map">
        <div className={"map " + (appIsLoading ? "map__is-loading" : "")}>
          <Map center={[userCoordinates[0], userCoordinates[1]]} zoom={zoom}>
            <TileLayer attribution={MAP_ATTR} url={MAP_TILES} />

            <Marker
              icon={this.userIcon}
              position={[userCoordinates[0], userCoordinates[1]]}
            >
              <Popup>
                <div>This is you!</div>
              </Popup>
            </Marker>

            {events.filter(this.filterEventsByDay).map(show => {
              return (
                <MapMarkerComponent
                  icon={this.mapMarker}
                  event={show}
                  key={show.id}
                  dispatch={this.props.dispatch}
                />
              );
            })}
          </Map>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    appIsLoading: state.appStatusReducer.appIsLoading,
    events: state.appStatusReducer.events,
    userCoordinates: state.appStatusReducer.userCoordinates,
    sidebarState: state.interactionReducer.sidebarState,
    zoom: state.appStatusReducer.zoom,
    dateRange: state.eventsReducer.dateRange
  };
}

export default connect(mapStateToProps)(MapContainer);
