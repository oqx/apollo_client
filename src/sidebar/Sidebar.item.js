import React, { Component } from 'react'

class SidebarItem extends Component {

  render() {
    return (
      <li className="sidebar@list__item">{this.props.item}</li>
    )
  }
}

export default SidebarItem;
