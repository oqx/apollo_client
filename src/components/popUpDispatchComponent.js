import React from "react";
import { DISPATCH_NEW_EVENT_MODAL } from "../actionTypes";

export default class PopUpDispatchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentDidMount() {
    const { event, dispatch } = this.props;
    dispatch({
      type: DISPATCH_NEW_EVENT_MODAL,
      event
    });
  }

  render() {
    return <div key={this.props.event.id} />;
  }
}
