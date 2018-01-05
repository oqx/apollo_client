import React from "react";
import { connect } from "react-redux";

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { status: "Initializing..." };
    this.setStatus = this._setStatus.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setStatus(nextProps);
  }

  _setStatus(_props) {
    if (_props.fetching_location !== this.props.fetching_location) {
      this.setState({ status: "Fetching Location..." });
    }
    if (_props.fetching_data !== this.props.fetching_data) {
      this.setState({ status: "Retrieving Data..." });
    }
    if (_props.alert_is_visible !== this.props.alert_is_visible) {
      this.setState({ status: _props.alert_title });
    } else if(!_props.app_is_loading) {
      this.setState({
        status: "Completed."
      });
    }
  }

  render() {
    const { app_is_loading } = this.props;
    return (
      <div className="footer">
        {this.state.status}
        {app_is_loading && <div className="footer__loader" />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    app_is_loading: state.loading_reducer.app_is_loading,
    fetching_location: state.loading_reducer.fetching_location,
    fetching_data: state.loading_reducer.fetching_data,
    alert_title: state.ui_reducer.alert_title,
    alert_is_visible: state.ui_reducer.alert_is_visible
  };
};
export default connect(mapStateToProps)(Footer);
