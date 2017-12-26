import React from "react";
import { connect } from "react-redux";
import IconBtn from "./iconBtnComponent";
import LogoThumb from "./branding/logoThumbComponent";
import LogoText from "./branding/logoTextComponent";
import { setSidebarState } from "../actions/interactionActions";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.dispatch = props.dispatch;
    this.state = {
      sidebarState: props.sidebarState
    };
    this.toggleSidebar = this._toggleSidebar.bind(this);
  }

  _toggleSidebar() {
    this.dispatch(setSidebarState(!this.state.sidebarState));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ sidebarState: nextProps.sidebarState });
  }

  render() {
    return (
      <nav className="nav">
        <div className="nav__logo-col">
          <LogoThumb marginRight="12px" />
          <LogoText />
        </div>

        <div className="nav__links-col">
          <ul className="ul ul--horizontal">
            <li className="ul__li">
              <IconBtn
                iconClass="ion-ios-search"
                controlFunc={this.toggleSidebar}
              />
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    sidebarState: state.interactionReducer.sidebarState
  };
}
export default connect(mapStateToProps)(Nav);
