import React from 'react'
import { connect } from 'react-redux'

const Footer = (props) => {

	return (
		<div className="footer">
			{!!props.fetchingLocation
		 ? 'Fetching Location...'
		 : !!props.fetchingData
		 ? 'Retrieving Data...'
		 : !!props.mappingData
		 ? 'Mapping Data...'
		 : 'Completed'}
		 {props.appIsLoading && <div className="footer__loader"></div>}
	 </div>
 )
}

const mapStateToProps = (state) => {
	return {
		appIsLoading: state.getIn(['appStatusReducer', 'appIsLoading']),
		fetchingLocation: state.getIn(['appStatusReducer', 'fetchingLocation']),
		fetchingData: state.getIn(['appStatusReducer', 'fetchingData']),
		mappingData: state.getIn(['appStatusReducer', 'mappingData'])
	}
}
export default connect(mapStateToProps)(Footer)
