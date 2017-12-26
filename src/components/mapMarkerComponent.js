import React from "react";
import { Marker, Popup } from "react-leaflet";
import PopUpDispatchComponent from "./popUpDispatchComponent";

const MapMarkerComponent = props => {
  return (
    <Marker
      icon={props.icon}
      key={props.event.id}
      position={props.event.latlng}
    >
      <Popup>
        <PopUpDispatchComponent
          event={props.event}
          getPopUpStatusAndEvent={props.getPopUpStatusAndEvent}
          dispatch={props.dispatch}
        />
      </Popup>
    </Marker>
  );
};

export default MapMarkerComponent;
