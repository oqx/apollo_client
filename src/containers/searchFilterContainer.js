import React from "react";
import { connect } from "react-redux";
import Btn from "../components/buttons/buttonComponent";
import SelectField from "../components/forms/selectField";
import {
  getResultsByCoordinates,
  $dataUpdateDateFilter
} from "../actions/dataActions";
import { $uiSetSidebarState, $uiCloseAlert } from "../actions/uiActions";
import {
  $requestRadiusUpdate,
  $requestRadiusUpdateComplete
} from "../actions/loadingActions";
import { SEARCH_RADIUS, DATE_FILTER_OPTIONS } from "../CONSTANTS";
import AddressFieldContainer from "./addressFormContainer";

class SearchFilters extends React.Component {
  constructor(props) {
    super(props);
    this.toggleAddressFields = this._toggleAddressFields.bind(this);
    this.updateSearchRadiusOnMap = this._updateSearchRadiusOnMap.bind(this);
    this.handleSearchRadiusField = this._handleSearchRadiusField.bind(this);
    this.handleDateRangeField = this._handleDateRangeField.bind(this);
    this.addBounceEffectOnSidebarToggle = this._addBounceEffectOnSidebarToggle.bind(
      this
    );
    this.handleFormAnimationOnMount = this._handleFormAnimationOnMount.bind(
      this
    );

    this.props = props;
    this.state = {
      addressFieldsAreHidden: true,
      radius: this.props.radius,
      date_range: this.props.date_rage,
      eventsAreLoading: false,
      sidebar_state: this.props.sidebar_state,
      displaySearch: false,
      displayMountAnimation: false,
      animateClass: null,
      btnAnimation: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    nextProps.dispatch($uiCloseAlert());
    this.addBounceEffectOnSidebarToggle(nextProps);
  }

  componentDidMount() {
    this.handleFormAnimationOnMount();
  }

  _handleFormAnimationOnMount() {
    setTimeout(() => {
      this.setState({
        animateClass: "zoom-in",
        displaySearch: true,
        displayMountAnimation: true
      });
      setTimeout(() => {
        this.setState({ displayMountAnimation: false });
      }, 1200);
    }, 1200);
  }

  _addBounceEffectOnSidebarToggle(_nextProps) {
    if (
      !this.state.displayMountAnimation &&
      _nextProps.sidebar_state !== this.props.sidebar_state
    ) {
      this.setState({ animateClass: "" });
      if (_nextProps.sidebar_state && !this.state.displayMountAnimation) {
        setTimeout(() => {
          this.setState({ animateClass: "wobble" });
        }, 300);
      }
    }
  }

  _clearBtnAnimation() {
    this.setState({ btnAnimation: "" });
  }

  _toggleAddressFields() {
    if (this.state.btnAnimation === "") {
      this.setState({ btnAnimation: "zoom-out animate" });
      setTimeout(() => {
        this.setState({
          addressFieldsAreHidden: !this.state.addressFieldsAreHidden
        });
      }, 200);
    } else {
      this.setState({
        btnAnimation: "",
        addressFieldsAreHidden: !this.state.addressFieldsAreHidden
      });
    }
  }

  _updateSearchRadiusOnMap(e) {
    e.preventDefault();
    const { dispatch, radius_is_updating } = this.props;
    dispatch($requestRadiusUpdate());

    getResultsByCoordinates(this.state.radius);
    if (!radius_is_updating) {
      setTimeout(() => {
        dispatch($uiSetSidebarState(false));
      }, 500);
    }
    dispatch($requestRadiusUpdateComplete());
  }

  /* ----------------------
	Handle data from fields
  ---------------------- */

  _handleSearchRadiusField(e) {
    const r = parseInt(e.target.value, 10);
    this.setState({
      radius: r
    });
  }

  _handleDateRangeField(e) {
    const { dispatch } = this.props;
    const dr = e.target.value;
    this.setState({
      date_range: dr
    });
    dispatch($dataUpdateDateFilter(dr));
  }

  render() {
    var data = this.state;
    return (
      this.state.displaySearch && (
        <form
          onSubmit={this.handleFormSubmit}
          className={`search-filters animate ${this.state.animateClass}`}
        >
          <div className="search-filters__contents">
            <h3 className="hd hd--3 hd--primary hd--rule">Search Filters</h3>
            <div className="grid">
              <div className="grid__col-auto search-filters__when-col">
                <SelectField
                  value={data.date_range}
                  label="When"
                  name="date"
                  array={DATE_FILTER_OPTIONS}
                  controlFunc={this.handleDateRangeField}
                />
              </div>
              <div className="grid__col-auto">
                <SelectField
                  value={data.radius}
                  label="Radius"
                  name="radius"
                  array={SEARCH_RADIUS}
                  controlFunc={this.handleSearchRadiusField}
                />
              </div>
            </div>
            <div
              className={`search-filters__btn-wrap ${this.state.btnAnimation}`}
            >
              {data.addressFieldsAreHidden && (
                <Btn
                  look="primary"
                  outline={true}
                  block={true}
                  controlFunc={this.updateSearchRadiusOnMap}
                  isLoading={this.props.radius_is_updating}
                >
                  Update Radius
                </Btn>
              )}
            </div>
            <div className="search-filters__address-link">
              <span className="link" onClick={this.toggleAddressFields}>
                Search by Address
              </span>
            </div>
          </div>
          {!data.addressFieldsAreHidden && <AddressFieldContainer />}
        </form>
      )
    );
  }
}

function mapStateToProps(state) {
  return {
    radius_is_updating: state.loading_reducer.radius_is_updating,
    radius: state.data_reducer.radius,
    date_rage: state.data_reducer.date_range,
    sidebar_state: state.ui_reducer.sidebar_state
  };
}

export default connect(mapStateToProps)(SearchFilters);
