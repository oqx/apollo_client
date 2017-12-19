import React from "react";
import { connect } from "react-redux";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { divIcon } from "leaflet";
import moment from "moment";
import { Map as IMap } from "immutable";
import { MAP_TILES, MAP_ATTR } from "../CONSTANTS";
import { getResultsByCoordinates } from "../actions/eventsActions";
import EventDetailsComponent from "../components/eventDetailsComponent";
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

    this.state = {
      data: IMap({
        event: {
          distance: 1.5,
          venue: "First Ave",
          coordinates: [],
          date: Date.now(),
          artist: []
        },
        eventDetailsModalIsVisible: false
      })
    };
    this.getPopUpStatusAndEvent = this.getPopUpStatusAndEvent.bind(this);
    this.handleEventDetailsVisibility = this.handleEventDetailsVisibility.bind(
      this
    );
    this.filterEventsByDay = this.filterEventsByDay.bind(this);
  }

  componentDidMount() {
    const { dispatch, radius } = this.props;
    dispatch(getResultsByCoordinates(radius));
    // dispatch(getMockResultsByCoordinates(radius))
  }

  handleEventDetailsVisibility() {
    this.setState(({ data }) => ({
      data: data.update("eventDetailsModalIsVisible", v => false)
    }));
  }

  filterEventsByDay(event) {
    const eod = moment().endOf("day");
    const endOfDay = moment(eod).format();
    const eot = moment(eod).add(24, "hours");
    const endOfTomorrow = moment(eot).format();
    const { dateRange } = this.props;

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

  getPopUpStatusAndEvent(event) {
    const newEvent = event;
    this.setState(({ data }) => ({
      data: data.update("event", e => newEvent)
    }));
    this.setState(({ data }) => ({
      data: data.update("eventDetailsModalIsVisible", v => true)
    }));
  }

  render() {
    const { appIsLoading, events, userCoordinates, zoom } = this.props;

    const data = this.state.data;

    return (
      <div className="structure@map">
        <div className={"map " + (appIsLoading ? "map__is-loading" : "")}>
          <Map
            center={[userCoordinates.get("0"), userCoordinates.get("1")]}
            zoom={zoom}
          >
            <TileLayer attribution={MAP_ATTR} url={MAP_TILES} />

            <Marker
              icon={this.userIcon}
              position={[userCoordinates.get("0"), userCoordinates.get("1")]}
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
                  getPopUpStatusAndEvent={this.getPopUpStatusAndEvent}
                  key={show.id}
                />
              );
            })}
          </Map>
        </div>

        {data.get("eventDetailsModalIsVisible") && (
          <EventDetailsComponent
            handleVisibility={this.handleEventDetailsVisibility}
            event={data.get("event")}
            eventDetailsIsOpen={data.get("eventDetailsModalIsVisible")}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.getIn(["appStatusReducer", "events"]),
    userCoordinates: state.getIn(["appStatusReducer", "userCoordinates"]),
    appIsLoading: state.getIn(["appStatusReducer", "appIsLoading"]),
    sidebarState: state.getIn(["interactionReducer", "sidebarState"]),
    zoom: state.getIn(["appStatusReducer", "zoom"]),
    dateRange: state.getIn(["eventsReducer", "dateRange"])
  };
}

export default connect(mapStateToProps)(MapContainer);
