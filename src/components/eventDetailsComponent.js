import React from 'react'
import moment from 'moment'

export default class EventDetailsComponent extends React.Component {
  constructor(props) {
    super(props)
    this.props = props;
  }

  render() {
    const { event, eventDetailsIsOpen, handleVisibility } = this.props

    return (
      <section className={"event-details " + (eventDetailsIsOpen ? '' : 'event-details__hidden')}>
        <div className="event-details__close" onClick={handleVisibility}><i className="icon ion-android-close"></i></div>
        <h3 className="hd hd--3 hd--rule">{event.venue}</h3>
        <div className="event-details@geo">
					<span>Begins {moment(event.date).fromNow()}</span>&nbsp;&nbsp;|
          <span className="event-details@geo__distance">{event.distance}mi</span>
          <a href={`http://www.google.com/maps/place/${event.latlng[0]},${event.latlng[1]}`} target="_blank"><span className="ui-icon ui-icon--sm ui-icon--square ui-icon--tertiary" role="button"><i className="icon ion-navigate"></i></span></a>
        </div>
        <div className="event-details__info">
          <div className="">Artists</div>
          <div className="event-details__col-date">
            <time dateTime="{moment(event.date).format()}"
              className="event-details__date">{!!event.date ? moment(event.date).format('MMM Do \'YY, h:mm a') : ''}</time>
          </div>
        </div>
        <ul className="event-details@list">
          {event.artist.map(artist => <li className="event-details@list__item" key={artist.id}>{artist.displayName}</li>)}
        </ul>
      </section>
    )
  }
}
