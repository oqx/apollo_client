import React from "react";
import Btn from "../components/buttons/buttonComponent";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

describe("<Btn />", () => {
  let state = {
    btnClick: false
  };

  const spy = jest.fn();

  const handleClickStub = () => {
    state.btnClick = true;
    spy();
  };

  const testBtnMap = {
    primary: "btn--primary",
    secondary: "btn--secondary"
  };

  const btn = shallow(
    <Btn
      isLoading={false}
      type="submit"
      block={true}
      outline={true}
      look="primary"
      controlFunc={handleClickStub}
    >
      Submit
    </Btn>
  );

  const mountBtn = mount(
    <Btn
      isLoading={false}
      type="submit"
      block={true}
      outline={true}
      look="primary"
      controlFunc={handleClickStub}
    >
      Submit
    </Btn>
  );

  it("should render correctly", () => {
    expect(toJson(btn)).toMatchSnapshot();
  });

  it("should have a btn map of primary and secondary looks", () => {
    expect(testBtnMap).toEqual(btn.instance().btnMap);
  });

  it("should display a loading animation", () => {
    mountBtn.setProps({ isLoading: true });
    expect(mountBtn.find(".btn-loader").length).toBe(1);
  });

  it("should trigger a handler on click", () => {
    mountBtn.simulate("click");
    expect(spy).toHaveBeenCalledTimes(1);
    expect(state.btnClick).toBe(true);
  });
});
