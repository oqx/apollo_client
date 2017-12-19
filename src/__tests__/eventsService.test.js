import * as es from "../services/eventsService";
import { singleShow, partiallyMappedShow } from "../mockResults";

const minimalShow = {
  id: 243426,
  type: "Concert",
  date: null,
  artist: [
    { displayName: "RLGDPPL", id: 23431 },
    { displayName: "Joelletron", id: 23432 },
    { displayName: "Windmill", id: 23433 }
  ]
};

describe("checkIfShowIsValid", () => {
  it("should return true since show is not null or undefined", () => {
    expect(es.checkIfShowIsValid(singleShow)).toEqual(true);
  });
  it("should return false since value is undefined", () => {
    expect(es.checkIfShowIsValid(undefined)).toEqual(false);
  });
});

describe("filterNearbyEvents", () => {
  const expectedToFilter = {
    radius: 10,
    distance: 15
  };

  const expectedToKeep = {
    radius: 10,
    distance: 4
  };
  it("filter out events that are further than designated distance", () => {
    expect(es.filterNearbyEvents(expectedToFilter)).toEqual(undefined);
  });
  it("do not filter events within radius", () => {
    expect(es.filterNearbyEvents(expectedToKeep)).toEqual(expectedToKeep);
  });
});

describe("mapResultsToArrayOfObjects", () => {
  it("should return a mapped event object", () => {
    expect(es.mapResultsToArrayOfObjects(singleShow)).toMatchObject(
      partiallyMappedShow
    );
  });
});

describe("addDistanceToEvent", () => {
  it("should return the distance between the user and the venue", () => {
    expect(es.addDistanceToEvent(singleShow)).toHaveProperty("distance", 1.5);
  });
});

describe("addRadiusToEvent", () => {
  it("should return new object with radius key/val pair", () => {
    expect(es.addRadiusToEvent(minimalShow, 10)).toHaveProperty("radius", 10);
  });
});

describe("addUserCoordinatesToEvent", () => {
  let coordinates = [44.988767, -93.254362];
  let eventWithUserCoords = {
    id: 243426,
    type: "Concert",
    date: null,
    artist: [
      { displayName: "RLGDPPL", id: 23431 },
      { displayName: "Joelletron", id: 23432 },
      { displayName: "Windmill", id: 23433 }
    ],
    user_coordinates: {
      lat: 44.988767,
      lng: -93.254362
    }
  };

  it("should return new object with user coordinate key/val pair", () => {
    expect(
      es.addUserCoordinatesToEvent(minimalShow, coordinates)
    ).toMatchObject(eventWithUserCoords);
  });
});

describe("removeExpiredEvents", () => {
  let datetimeEvents = [
    {
      start: {
        datetime: Date.now() + 5555
      }
    },
    {
      start: {
        datetime: Date.now() - 5555
      }
    },
    {
      start: {
        datetime: Date.now() - 5555
      }
    }
  ];

  let datetimeEvent = {
    start: {
      datetime: Date.now() + 5555
    }
  };

  it("should return new events object with past shows removed", () => {
    let results = datetimeEvents.map(es.removeExpiredEvents).filter(e => e);
    expect(results[0]).toMatchObject(datetimeEvent);
  });
});

describe("removeTimelessEvents", () => {
  let datetimeEvents = [
    {
      start: {
        datetime: null
      }
    },
    {
      start: {
        datetime: 1513646178498
      }
    }
  ];
  it("should remove all ", () => {
    let results = datetimeEvents.map(es.removeTimelessEvents).filter(e => e);
    expect(results[0]).toMatchObject({
      start: {
        datetime: 1513646178498
      }
    });
  });
});
