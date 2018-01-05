import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class AlertContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      message: props.message,
      type: props.type,
      reload: props.reload,
      is_visible: props.is_visible
    };
    this.closeAlert = this._closeAlert.bind(this);
    this.setIcon = this._setIcon.bind(this);
    this.reload = this._reload.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.title,
      message: nextProps.message,
      type: nextProps.type,
      reload: nextProps.reload,
      icon: this.setIcon(nextProps.type),
      is_visible: nextProps.is_visible
    });
  }

  _closeAlert() {
    const { dispatch } = this.props;
    dispatch({ type: "CLOSE_ALERT" });
    this.reload();
  }

  _setIcon(type) {
    switch (type) {
      case "error":
        return "ion ion-alert-circled";
      case "notification":
        return "ion-information-circled";
      default:
        return "ion ion-alert-circled";
    }
  }

  _reload() {
    if (this.state.reload) window.location.reload();
  }

  render() {
    return (
      <section
        role="alert"
        aria-live="polite"
        aria-hidden={!this.state.is_visible}
        className={
          this.state.is_visible
            ? `alert alert--${this.state.type} is-visible`
            : "alert"
        }
        onClick={this.closeAlert}
      >
        <div className="alert@container" onClick={e => e.stopPropagation()}>
          <div className="alert@icon">
            <i className={this.state.icon} />
          </div>
          <div className="alert@info">
            <h3 className="alert@info__title">{this.state.title}</h3>
            <p className="alert@info__message">{this.state.message}</p>
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    title: state.ui_reducer.alert_title,
    message: state.ui_reducer.alert_message,
    type: state.ui_reducer.alert_type,
    reload: state.ui_reducer.alert_reload,
    is_visible: state.ui_reducer.alert_is_visible
  };
}

AlertContainer.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  reload: PropTypes.bool,
  is_visible: PropTypes.bool
};

export default connect(mapStateToProps)(AlertContainer);
