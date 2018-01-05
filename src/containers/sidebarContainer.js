import React from "react";
import { connect } from "react-redux";
import SearchFilters from "./searchFilterContainer";
import { $uiSetSidebarState } from "../actions/uiActions";

class SidebarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSidebar = this._toggleSidebar.bind(this);
    this.closeOnMountOnMobile = this._closeOnMountOnMobile.bind(this);
  }

  componentWillMount() {
    this.closeOnMountOnMobile();
  }

  _closeOnMountOnMobile() {
    if (window.innerWidth < 768) {
      this.toggleSidebar();
    }
  }

  _toggleSidebar() {
    const { dispatch, sidebar_state } = this.props;
    dispatch($uiSetSidebarState(!sidebar_state));
  }

  render() {
    const { sidebar_state } = this.props;
    return (
      <section
        key={"sidebar_component"}
        className={"sidebar " + (sidebar_state ? "" : "sidebar--hide")}
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
    sidebar_state: state.ui_reducer.sidebar_state
  };
}

export default connect(mapStateToProps)(SidebarContainer);
