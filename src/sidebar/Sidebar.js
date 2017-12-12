import React, { Component } from 'react'
import SidebarList from './Sidebar.list'

class Sidebar extends Component {

  render() {
    return (
      <aside className={'sidebar sidebar--left' + (this.props.displaySidebar ? ' is-visible' : '') }>
        <SidebarList routes={this.props.routes}></SidebarList>
      </aside>
    )
  }
}

export default Sidebar;
