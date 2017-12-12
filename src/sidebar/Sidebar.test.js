import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './Sidebar';
import SidebarList from './Sidebar.list';
import SidebarItem from './Sidebar.item';

const routes = [
  'home',
  'about',
  'bio'
];

it('renders sidebar successfully', () => {
  const aside = document.createElement('aside');
  ReactDOM.render(<Sidebar routes={routes} />, aside);
});
