import React from 'react'
import { connect } from 'react-redux'
import IconBtn from './iconBtnComponent'
import LogoThumb from './branding/logoThumbComponent'
import LogoText from './branding/logoTextComponent'
import { setSidebarState } from '../actions/interactionActions'

const Nav = (props) => {

		const toggleSidebar = () => {
			const { dispatch,
			 				sidebarState } = props
			dispatch(setSidebarState(!sidebarState))
		}
    return (
			<nav className="nav">

				<div className="nav__logo-col">
					<LogoThumb marginRight="12px"/>
					<LogoText />
				</div>

				<div className="nav__links-col">
					<ul className="ul ul--horizontal">
						<li className="ul__li"><IconBtn iconClass="ion-ios-search" func={toggleSidebar} /></li>
					</ul>
				</div>

			</nav>
    )

}

function mapStateToProps(state) {
	return {
		sidebarState: state.getIn(['interactionReducer', 'sidebarState'])
	}
}
export default connect(mapStateToProps)(Nav)
