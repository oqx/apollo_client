import React from "react";

export default class PopUpDispatchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentDidMount() {
    const { event, getPopUpStatusAndEvent } = this.props;
    getPopUpStatusAndEvent(event);
  }

  componentDidUnMount() {
    const { getPopUpStatusAndEvent } = this.props;
    getPopUpStatusAndEvent(null);
  }

  render() {
    return <div key={this.props.event.id} />;
  }
}
