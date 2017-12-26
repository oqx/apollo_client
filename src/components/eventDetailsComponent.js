import React from "react";
import { connect } from "react-redux";
import moment from "moment";

class EventDetailsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      eventModalIsOpen: props.eventModalIsOpen,
      event: {
        venue: null,
        date: null,
        distance: null,
        artist: [
          {
            displayName: null,
            id: null
          }
        ],
        latlng: [null, null],
        id: null
      }
    };
    this.handleVisibility = this.handleVisibility.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      eventModalIsOpen: nextProps.eventModalIsOpen,
      event: nextProps.event
    });
  }

  handleVisibility() {
    document.querySelector(".leaflet-container").click();
    this.props.dispatch({
      type: "CLOSE_EVENTS_MODAL"
    });
  }

  render() {
    const { event, eventModalIsOpen } = this.state;

    return (
      <section
        className={
          "event-details " + (eventModalIsOpen ? "" : "event-details__hidden")
        }
      >
        <div className="event-details__close" onClick={this.handleVisibility}>
          <i className="icon ion-android-close" />
        </div>
        <h3 className="hd hd--3 hd--rule">{event.venue}</h3>
        <div className="event-details@geo">
          <span>Begins {moment(event.date).fromNow()}</span>&nbsp;&nbsp;|
          <span className="event-details@geo__distance">
            {event.distance}mi
          </span>
          <a
            href={`http://www.google.com/maps/place/${event.latlng[0]},${
              event.latlng[1]
            }`}
            target="_blank"
          >
            <span
              className="ui-icon ui-icon--sm ui-icon--square ui-icon--tertiary"
              role="button"
            >
              <i className="icon ion-navigate" />
            </span>
          </a>
        </div>
        <div className="event-details__info">
          <div className="">Artists</div>
          <div className="event-details__col-date">
            <time
              dateTime="{moment(event.date).format()}"
              className="event-details__date"
            >
              {!!event.date
                ? moment(event.date).format("MMM Do 'YY, h:mm a")
                : ""}
            </time>
          </div>
        </div>
        <ul className="event-details@list">
          {event.artist.map(artist => (
            <li className="event-details@list__item" key={artist.id}>
              {artist.displayName}
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    eventModalIsOpen: state.eventsReducer.eventModalIsOpen,
    event: state.eventsReducer.event
  };
}
export default connect(mapStateToProps)(EventDetailsComponent);
