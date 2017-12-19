import React from "react";
import IconBtn from "../components/iconBtnComponent";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

describe("<IconBtn />", () => {
  let state = {
    btnClick: false
  };

  const spy = jest.fn();

  const handleClickStub = () => {
    state.btnClick = true;
    spy();
  };

  const iconBtn = shallow(
    <IconBtn iconClass="ion-ios-search" controlFunc={handleClickStub}>
      Submit
    </IconBtn>
  );

  it("should render correctly", () => {
    expect(toJson(iconBtn)).toMatchSnapshot();
  });

  it("should trigger a handler on click", () => {
    iconBtn.simulate("click");
    expect(spy).toHaveBeenCalledTimes(1);
    expect(state.btnClick).toBe(true);
  });
});
