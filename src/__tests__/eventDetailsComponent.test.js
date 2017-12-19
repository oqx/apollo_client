import React from "react";
import EventDetailsComponent from "../components/eventDetailsComponent";
import renderer from "react-test-renderer";

const event = {
  id: 243426,
  type: "Concert",
  date: null,
  artist: [
    { displayName: "RLGDPPL", id: 23431 },
    { displayName: "Joelletron", id: 23432 },
    { displayName: "Windmill", id: 23433 }
  ],
  venue: "First Avenue",
  radius: 5,
  latlng: [44.988767, -93.254362],
  distance: 3
};

describe("<EventDetailsComponent />", () => {
  function handleEventDetailsVisibility() {
    return true;
  }

  it("should render correctly", () => {
    const eventModal = renderer
      .create(
        <EventDetailsComponent
          handleVisibility={handleEventDetailsVisibility}
          event={event}
          eventDetailsIsOpen={true}
        />
      )
      .toJSON();
    expect(eventModal).toMatchSnapshot();
  });
});
