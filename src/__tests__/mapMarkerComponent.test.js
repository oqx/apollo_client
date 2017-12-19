import React from "react";
import MapMarkerComponent from "../components/mapMarkerComponent";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import { completeShow } from "../mockResults";
import { divIcon } from "leaflet";

let store, container;

const spy = jest.fn();

const state = {
  btnClick: false
};
const handleClickStub = () => {
  state.btnClick = true;
  spy();
};

const userIcon = divIcon({
  className: "ion-android-navigate icon__navigator "
});

describe("<MapMarkerComponent />", () => {
  beforeEach(() => {
    container = shallow(
      <MapMarkerComponent
        event={completeShow}
        getPopUpStatusAndEvent={handleClickStub}
        icon={userIcon}
      />
    );
  });

  it("should render successfully", () => {
    expect(container.length).toEqual(1);
  });

  it("should render correctly", () => {
    expect(toJson(container)).toMatchSnapshot();
  });
});
