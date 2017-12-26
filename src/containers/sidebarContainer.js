import React from "react";
import { connect } from "react-redux";
import SearchFilters from "./searchFilterContainer";
import { setSidebarState } from "../actions/interactionActions";

class SidebarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  toggleSidebar() {
    const { dispatch, sidebarState } = this.props;
    dispatch(setSidebarState(!sidebarState));
  }

  render() {
    const { sidebarState } = this.props;
    return (
      <section
        key={"sidebar_component"}
        className={"sidebar " + (sidebarState ? "" : "sidebar--hide")}
      >
        <div
          role="button"
          className="sidebar__hide-btn"
          onClick={this.toggleSidebar}
        >
          <i className="ion ion-close-round" />
        </div>
        <SearchFilters />
        <div className="sidebar__aside" />
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    sidebarState: state.interactionReducer.sidebarState
  };
}

export default connect(mapStateToProps)(SidebarContainer);
