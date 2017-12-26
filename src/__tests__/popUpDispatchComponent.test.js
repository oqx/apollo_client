import React from "react";
import PopUpDispatchComponent from "../components/popUpDispatchComponent";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import { completeShow } from "../mockResults";

let store, container, mountedContainer;

const spy = jest.fn();

const handleOnMount = obj => spy();

describe("<PopUpDispatchComponent />", () => {
  beforeEach(() => {
    container = shallow(
      <PopUpDispatchComponent event={completeShow} dispatch={handleOnMount} />
    );
    mountedContainer = mount(
      <PopUpDispatchComponent event={completeShow} dispatch={handleOnMount} />
    );
  });

  it("should render successfully", () => {
    expect(container.length).toEqual(1);
  });

  it("should match snapshot", () => {
    expect(toJson(container)).toMatchSnapshot();
  });

  it("should trigger a function when componentDidMount", () => {
    expect(spy).toHaveBeenCalledTimes(2);
  });

  afterEach(() => {
    spy.mockClear();
  });
});
