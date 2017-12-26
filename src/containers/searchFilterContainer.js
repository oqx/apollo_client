import React from "react";
import { connect } from "react-redux";
import Btn from "../components/buttons/buttonComponent";
import SelectField from "../components/forms/selectField";
import {
  getResultsByCoordinates,
  updateDateFilter
} from "../actions/eventsActions";
import { SEARCH_RADIUS, DATE_FILTER_OPTIONS } from "../CONSTANTS";
import { setSidebarState } from "../actions/interactionActions";
import AddressFieldContainer from "./addressFormContainer";

class SearchFilters extends React.Component {
  constructor(props) {
    super(props);
    this.toggleAddressFields = this.toggleAddressFields.bind(this);
    this.updateSearchRadiusOnMap = this.updateSearchRadiusOnMap.bind(this);
    this.handleSearchRadiusField = this.handleSearchRadiusField.bind(this);
    this.handleDateRangeField = this.handleDateRangeField.bind(this);

    this.props = props;
    this.state = {
      addressFieldsAreHidden: true,
      radius: this.props.radius,
      dateRange: this.props.dateRange,
      eventsAreLoading: false
    };
  }

  toggleAddressFields() {
    this.setState({
      addressFieldsAreHidden: !this.state.addressFieldsAreHidden
    });
  }

  updateSearchRadiusOnMap(e) {
    e.preventDefault();
    const { dispatch, radiusIsUpdating } = this.props;
    dispatch({
      type: "RADIUS_UPDATE_PENDING"
    });

    dispatch(getResultsByCoordinates(this.state.radius));
    if (!radiusIsUpdating) {
      setTimeout(() => {
        dispatch(setSidebarState(false));
      }, 500);
    }
  }

  /* ----------------------
	Handle data from fields
  ---------------------- */

  handleSearchRadiusField(e) {
    const r = parseInt(e.target.value, 10);
    this.setState({
      radius: r
    });
  }

  handleDateRangeField(e) {
    const { dispatch } = this.props;
    const dr = e.target.value;
    this.setState({
      dateRange: dr
    });
    dispatch(updateDateFilter(dr));
  }

  render() {
    var data = this.state;
    return (
      <form onSubmit={this.handleFormSubmit}>
        <div className="search-filters">
          <h3 className="hd hd--3 hd--primary hd--rule">Search Filters</h3>
          <div className="grid">
            <div className="grid__col-auto search-filters__when-col">
              <SelectField
                value={data.dateRange}
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
          <div className="search-filters__btn-wrap">
            {data.addressFieldsAreHidden && (
              <Btn
                look="primary"
                outline={true}
                block={true}
                controlFunc={this.updateSearchRadiusOnMap}
                isLoading={this.props.radiusIsUpdating}
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
    );
  }
}

function mapStateToProps(state) {
  return {
    radiusIsUpdating: state.appStatusReducer.radiusIsUpdating,
    radius: state.appStatusReducer.radius,
    dateRange: state.eventsReducer.dateRange
  };
}

export default connect(mapStateToProps)(SearchFilters);
