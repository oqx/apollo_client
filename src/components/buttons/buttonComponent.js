import React from "react";
import PropTypes from "prop-types";
import BtnLoadState from "./buttonLoadState";

export default class Btn extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.btnMap = {
      primary: "btn--primary",
      secondary: "btn--secondary"
    };

    this.state = {
      isLoading: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoading === true) {
      this.setState({ isLoading: true });
    } else {
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 2000);
    }
  }

  render() {
    return (
      <button
        type={this.props.type}
        onClick={this.props.controlFunc}
        className={
          "btn " +
          this.btnMap[this.props.look] +
          (this.props.outline ? " btn--outline " : "") +
          (this.state.isLoading ? "is-loading " : "") +
          (this.props.block ? "btn--block" : "")
        }
        ref={element => (this.element = element)}
      >
        {this.props.children}
        {this.state.isLoading && <BtnLoadState />}
      </button>
    );
  }
}

Btn.propTypes = {
  type: PropTypes.string,
  controlFunc: PropTypes.func,
  look: PropTypes.string.isRequired,
  outline: PropTypes.bool,
  children: PropTypes.string.isRequired,
  isLoading: PropTypes.bool
};
