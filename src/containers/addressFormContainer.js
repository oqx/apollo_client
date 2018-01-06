import React from "react";
import { connect } from "react-redux";
import Btn from "../components/buttons/buttonComponent";
import FormField from "../components/forms/formFields";
import { US_STATES } from "../CONSTANTS";
import { getResultsByAddress } from "../actions/dataActions";

class AddressFieldContainer extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.handleAddressField = this._handleAddressField.bind(this);
    this.handleCityField = this._handleCityField.bind(this);
    this.handleStateField = this._handleStateField.bind(this);
    this.handleZipField = this._handleZipField.bind(this);
    this.handleFormSubmit = this._handleFormSubmit.bind(this);
    this.addBounceEffect = this._addBounceEffect.bind(this);
    this.validateFields = this._validateFields.bind(this);
    this.canBeSubmitted = this._canBeSubmitted.bind(this);
    this.updateOnBlur = this._updateOnBlur.bind(this);

    this.state = {
      radius: this.props.radius,
      city: "",
      state: "",
      zip: "",
      is_visible: false,
      animateClass: "",
      errors: {
        city: false
      },
      btnIsEnabled: true
    };
  }

  componentDidMount() {
    this.setState({ animateClass: "zoom-in animate" });
  }

  componentWillUnmount() {
    this.addBounceEffect();
  }

  _addBounceEffect() {
    this.setState({ animateClass: "bounce-in animate" });
  }

  _handleAddressField(e) {
    this.setState({ address: e.target.value });
  }

  _handleCityField(e) {
    this.updateOnBlur(e);
    this.setState({ city: e.target.value });
  }

  _handleStateField(e) {
    this.setState({ state: e.target.value });
  }

  _handleZipField(e) {
    this.setState({ zip: e.target.value });
  }

  _updateOnBlur(e) {
    if (e.target.value.length > 0) {
      this.setState({
        errors: { city: false },
        btnIsEnabled: true
      });
    }
  }

  _validateFields(city, state) {
    const toValidate = {
      city: city.length === 0
    };
    this.setState({ errors: toValidate });
    return toValidate;
  }

  _canBeSubmitted() {
    const errors = this.validateFields(this.state.city, this.state.state);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    this.setState({ btnIsEnabled: !isDisabled });
    return !isDisabled;
  }

  _handleFormSubmit(e) {
    if (!this.canBeSubmitted()) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    const formPayload = {
      city: this.state.city,
      state: this.state.state,
      address: this.state.address,
      zip: this.state.zip
    };
    const r = this.state.radius;
    getResultsByAddress(formPayload, r);
  }

  render() {
    const { errors, btnIsEnabled } = this.state;

    return (
      <div
        className={`search-filters__address-box ${this.state.animateClass}`}
        role="group"
      >
        <FormField
          type={"text"}
          clasNames={"form@field__group"}
          placeholder={"City"}
          label={"City + State*"}
          key={"city_1"}
          error={errors.city}
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
            isDisabled={!btnIsEnabled}
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
    isLoading: state.loading_reducer.app_is_loading
  };
}

export default connect(mapStateToProps)(AddressFieldContainer);
