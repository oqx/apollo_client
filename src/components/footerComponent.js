import React from "react";
import { connect } from "react-redux";

const Footer = props => {
  return (
    <div className="footer">
      {!!props.fetchingLocation
        ? "Fetching Location..."
        : !!props.fetchingData ? "Retrieving Data..." : "Completed"}
      {props.appIsLoading && <div className="footer__loader" />}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    appIsLoading: state.getIn(["appStatusReducer", "appIsLoading"]),
    fetchingLocation: state.getIn(["appStatusReducer", "fetchingLocation"]),
    fetchingData: state.getIn(["appStatusReducer", "fetchingData"])
  };
};
export default connect(mapStateToProps)(Footer);
