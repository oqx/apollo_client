import React, { Component } from 'react'
import SidebarItem from './Sidebar.item'

class SidebarList extends Component {

  render() {
    return (
      <ul className="sidebar@list">
        {this.props.routes.map((route, idx) => <SidebarItem item={route} key={idx}></SidebarItem>)}
      </ul>
    )
  }
}

export default SidebarList;
