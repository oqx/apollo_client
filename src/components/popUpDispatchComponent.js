import React from "react";

export default class PopUpDispatchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentDidMount() {
    const { event, dispatch } = this.props;
    dispatch({
      type: "OPEN_EVENTS_MODAL",
      event
    });
  }

  render() {
    return <div key={this.props.event.id} />;
  }
}
