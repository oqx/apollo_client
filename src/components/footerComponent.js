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
    appIsLoading: state.appStatusReducer.appIsLoading,
    fetchingLocation: state.appStatusReducer.fetchingLocation,
    fetchingData: state.appStatusReducer.fetchingData
  };
};
export default connect(mapStateToProps)(Footer);
