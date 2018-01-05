import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { divIcon } from "leaflet";
import { MAP_TILES, MAP_ATTR } from "../CONSTANTS";
import * as eventsService from "../services/eventsService";
import { getResultsByCoordinates } from "../actions/dataActions";
import MapMarkerComponent from "../components/mapMarkerComponent";
import AlertContainer from "./alertContainer";

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.setEventsState = this._setEventsState.bind(this);

    this.userIcon = divIcon({
      className: "ion-android-navigate icon__navigator "
    });

    this.mapMarker = divIcon({
      className: "icon__marker"
    });

    this.state = {
      events: props.events
    };

    getResultsByCoordinates(props.radius);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.events !== this.state.events) {
      this.setEventsState(nextProps.events, nextProps.date_range, true);
    }

    if (
      nextProps.date_range !== this.props.date_range &&
      nextProps.events === this.state.events
    ) {
      this.setEventsState(nextProps.events, nextProps.date_range, false);
    }
  }

  _setEventsState(events, dateRange, updateMainEventObject = false) {
    let eventState = {
      filteredEvents: eventsService.handleNoEvents(events)
    };
    if (updateMainEventObject) eventState["events"] = events;
    this.setState({ ...eventState });
  }

  render() {
    const { app_is_loading, user_coordinates, zoom } = this.props,
      { filteredEvents } = this.state;

    return (
      <div className="structure@map">
        <AlertContainer />
        <div className={"map " + (app_is_loading ? "map__is-loading" : "")}>
          <Map center={[user_coordinates[0], user_coordinates[1]]} zoom={zoom}>
            <TileLayer attribution={MAP_ATTR} url={MAP_TILES} />

            <Marker
              icon={this.userIcon}
              position={[user_coordinates[0], user_coordinates[1]]}
            >
              <Popup>
                <div>This is you!</div>
              </Popup>
            </Marker>

            {filteredEvents &&
              filteredEvents.map(show => {
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
    app_is_loading: state.loading_reducer.app_is_loading,
    date_range: state.data_reducer.date_range,
    events: state.data_reducer.events,
    sidebar_state: state.ui_reducer.sidebar_state,
    user_coordinates: state.data_reducer.user_coordinates,
    zoom: state.data_reducer.zoom
  };
}

MapContainer.propTypes = {
  app_is_loading: PropTypes.bool,
  date_range: PropTypes.string,
  events: PropTypes.array,
  sidebar_state: PropTypes.bool,
  user_coordinates: PropTypes.array,
  zoom: PropTypes.number
};

export default connect(mapStateToProps)(MapContainer);
