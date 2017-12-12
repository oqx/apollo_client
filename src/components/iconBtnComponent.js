import React from 'react'
import PropTypes from 'prop-types';

const IconBtn = (props) => {

	const { iconClass, func } = props

	return (<div className="icon__default"role="button" onClick={func}>
						<i className={iconClass}></i>
					</div>)

}

IconBtn.propTypes = {
	iconClass: PropTypes.string.isRequired,
	func: PropTypes.func
}

export default IconBtn
