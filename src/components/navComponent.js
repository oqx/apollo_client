import React from "react";
import { connect } from "react-redux";
import IconBtn from "./iconBtnComponent";
import LogoThumb from "./branding/logoThumbComponent";
import LogoText from "./branding/logoTextComponent";
import { $uiSetSidebarState } from "../actions/uiActions";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.dispatch = props.dispatch;
    this.state = {
      sidebarState: props.sidebar_state,
      fadeInLogo: false
    };
    this.toggleSidebar = this._toggleSidebar.bind(this);
  }

  _toggleSidebar() {
    this.dispatch($uiSetSidebarState(!this.state.sidebarState));
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ fadeInLogo: true })
    }, 1000)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ sidebarState: nextProps.sidebar_state });
  }

  render() {
    return (
      <nav className="nav">
        {this.state.fadeInLogo && <div className={this.state.fadeInLogo ? "nav__logo-col bounce-in animate" : "nav__logo-col"}>
          <LogoThumb marginRight="12px" />
          <LogoText />
        </div>}

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
    sidebar_state: state.ui_reducer.sidebar_state
  };
}
export default connect(mapStateToProps)(Nav);
