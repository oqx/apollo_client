import React from "react";
import { connect } from "react-redux";
import Btn from "../components/buttons/buttonComponent";
import FormField from "../components/forms/formFields";
import { Map } from "immutable";
import { US_STATES } from "../CONSTANTS";
import { getResultsByAddress } from "../actions/eventsActions";
import { setSidebarState } from "../actions/interactionActions";

class AddressFieldContainer extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.handleAddressField = this.handleAddressField.bind(this);
    this.handleCityField = this.handleCityField.bind(this);
    this.handleStateField = this.handleStateField.bind(this);
    this.handleZipField = this.handleZipField.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.state = {
      data: Map({
        radius: this.props.radius,
        city: "",
        state: "",
        zip: ""
      })
    };
  }

  handleAddressField(e) {
    const a = e.target.value;
    this.setState(({ data }) => ({
      data: data.update("address", v => a)
    }));
  }

  handleCityField(e) {
    const c = e.target.value;
    this.setState(({ data }) => ({
      data: data.update("city", v => c)
    }));
  }

  handleStateField(e) {
    const s = e.target.value;
    this.setState(({ data }) => ({
      data: data.update("state", v => s)
    }));
  }

  handleZipField(e) {
    const z = e.target.value;
    this.setState(({ data }) => ({
      data: data.update("zip", v => z)
    }));
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    const formPayload = {
      city: this.state.data.get("city"),
      state: this.state.data.get("state"),
      address: this.state.data.get("address"),
      zip: this.state.data.get("zip")
    };
    const r = this.state.data.get("radius");
    dispatch(getResultsByAddress(formPayload, r));
    return setTimeout(() => {
      dispatch(setSidebarState(false));
    }, 1500);
  }

  render() {
    return (
      <div className="search-filters__address-box" role="group">
        <FormField
          type={"text"}
          clasNames={"form@field__group"}
          placeholder={"City"}
          label={"City + State"}
          key={"city_1"}
          controlFunc={this.handleCityField}
        >
          <select
            className="form@field__input"
            onChange={this.handleStateField}
          >
            {US_STATES.map((item, i) => {
              return (
                <option key={item + i} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </FormField>
        <FormField
          type={"text"}
          placeholder={"Address"}
          label={"Address"}
          key={"address_1"}
          name={"address"}
          controlFunc={this.handleAddressField}
        />
        <FormField
          type={"number"}
          placeholder={"Zip"}
          label={"Zip"}
          key={"zip_1"}
          name={"zip_code"}
          maxLength={5}
          controlFunc={this.handleZipField}
        />

        <div className="search-filters__btn-wrap">
          <Btn
            type="submit"
            look="primary"
            outline={true}
            isLoading={this.props.isLoading}
            controlFunc={this.handleFormSubmit}
          >
            Submit
          </Btn>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.getIn(["appStatusReducer", "appIsLoading"])
  };
}

export default connect(mapStateToProps)(AddressFieldContainer);