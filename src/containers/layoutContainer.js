import React from "react";
import Nav from "../components/navComponent";
import MapContainer from "./mapContainer";
import SidebarContainer from "./sidebarContainer";
import Footer from "../components/footerComponent";
import EventDetailsComponent from "../components/eventDetailsComponent";

export default class Layout extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 1500);
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      return null;
    }

    return (
      <div className="structure@body__inner">
        <Nav />
        <SidebarContainer />
        <MapContainer />
        <Footer />
        <EventDetailsComponent />
      </div>
    );
  }
}
