import React from 'react'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import Btn from '../components/button'
import FormField from '../components/forms/formFields'
import SelectField from '../components/forms/selectField'
import { getResultsByCoordinates,
				 getResultsByAddress,
				 updateDateFilter } from '../actions/eventsActions'
import { US_STATES,
				 SEARCH_RADIUS,
				 DATE_FILTER_OPTIONS } from '../CONSTANTS'
import { setSidebarState } from '../actions/interactionActions'

class SearchFilters extends React.Component {

  constructor(props) {
    super(props)
    this.toggleAddressFields = this.toggleAddressFields.bind(this)
		this.updateSearchRadiusOnMap = this.updateSearchRadiusOnMap.bind(this)
		this.handleSearchRadiusField = this.handleSearchRadiusField.bind(this)
		this.handleAddressField = this.handleAddressField.bind(this)
		this.handleCityField = this.handleCityField.bind(this)
		this.handleStateField = this.handleStateField.bind(this)
		this.handleZipField = this.handleZipField.bind(this)
		this.handleFormSubmit = this.handleFormSubmit.bind(this)
		this.handleDateRangeField = this.handleDateRangeField.bind(this)
		// this.updateSearchRadius = this.updateSearchRadius.bind(this)
		this.props = props
		this.state = {
			data: Map({
				addressFieldsAreHidden: true,
				radius: this.props.radius,
				dateRange: this.props.dateRange,
				city: '',
				state: '',
				zip: ''
			}),
      eventsAreLoading: false
		}
  }

  toggleAddressFields() {
      return this.setState(({data}) => ({
				data: data.update('addressFieldsAreHidden', v => !v)
			}))
  }

	updateSearchRadiusOnMap(e) {
		e.preventDefault();
		const { dispatch, radiusIsUpdating } = this.props
		dispatch({
			type: 'RADIUS_UPDATE_PENDING'
		})
		dispatch(getResultsByCoordinates(this.state.data.get('radius')))
    if(!radiusIsUpdating) {
      setTimeout(() => {
        dispatch(setSidebarState(false))
      }, 500)
    }
	}

/* ----------------------
	Handle data from fields
  ---------------------- */

	handleSearchRadiusField(e) {
		const r = parseInt(e.target.value, 10)
		this.setState(({data}) => ({
			data: data.update('radius', v => r)
		}))
	}

	handleDateRangeField(e) {
		const { dispatch } = this.props
		const dr = e.target.value
		this.setState(({data}) => ({
			data: data.update('dateRange', v => dr)
		}))
		dispatch(updateDateFilter(dr))
	}

	handleAddressField(e) {
		const a = e.target.value
		this.setState(({data}) => ({
			data: data.update('address', v => a)
		}))
	}

	handleCityField(e) {
		const c = e.target.value
		this.setState(({data}) => ({
			data: data.update('city', v => c)
		}))
	}

	handleStateField(e) {
		const s = e.target.value
		this.setState(({data}) => ({
			data: data.update('state', v => s)
		}))
	}

	handleZipField(e) {
		const z = e.target.value
		this.setState(({data}) => ({
			data: data.update('zip', v => z)
		}))
	}

	handleFormSubmit(e) {
		e.preventDefault()
		const { dispatch } = this.props
		const formPayload = {
			city: this.state.data.get('city'),
			state: this.state.data.get('state'),
			address: this.state.data.get('address'),
			zip: this.state.data.get('zip'),
		}
		const r = this.state.data.get('radius')
		dispatch(getResultsByAddress(formPayload, r))
    return setTimeout(() => {
      dispatch(setSidebarState(false))
    }, 1500)
	}

  render() {
		var data = this.state.data
    return (
			<form onSubmit={this.handleFormSubmit}>
	      <div className="search-filters">
	        <h3 className="hd hd--3 hd--primary hd--rule">Search Filters</h3>
					<div className="grid">
						<div className="grid__col-auto search-filters__when-col">
							<SelectField
								value={data.get('dateRange')}
								label="When"
								name="date"
								array={DATE_FILTER_OPTIONS}
								controlFunc={this.handleDateRangeField} />
						</div>
						<div className="grid__col-auto">
							<SelectField
								value={data.get('radius')}
								label="Radius"
								name="radius"
								array={SEARCH_RADIUS}
								controlFunc={this.handleSearchRadiusField} />
						</div>
					</div>
					<div className="search-filters__btn-wrap">
					{data.get('addressFieldsAreHidden') &&
						<Btn
							 look="primary"
							 outline="true"
							 block={true}
							 controlFunc={this.updateSearchRadiusOnMap}
							 isLoading={this.props.radiusIsUpdating}>Update Radius</Btn>}
					</div>
	        <div className="search-filters__address-link">
	          <span
	            className="link"
	            onClick={this.toggleAddressFields}>Search by Address</span>
	        </div>
	        <div className={"search-filters__address-box "
	            + (data.get('addressFieldsAreHidden')
	            ? 'search-filters__address-box--hide'
	            : '')}
	            role="group">
	          <FormField
	            type={'text'}
	            clasNames={'form@field__group'}
	            placeholder={'City'}
	            label={'City + State'}
	            key={'city_1'}
							controlFunc={this.handleCityField}>
	            <select className="form@field__input" onChange={this.handleStateField}>
	              {(US_STATES.map((item, i) => {
	                return <option key={item + i} value={item}>{item}</option>
	              }))}
	            </select>
	          </FormField>
	          <FormField
	            type={'text'}
	            placeholder={'Address'}
	            label={'Address'}
	            key={'address_1'}
	            name={'address'}
							controlFunc={this.handleAddressField}
	            />
	          <FormField
	            type={'number'}
	            placeholder={'Zip'}
	            label={'Zip'}
	            key={'zip_1'}
	            name={'zip_code'}
	            maxLength={5}
							controlFunc={this.handleZipField}/>

							<div className="search-filters__btn-wrap">
								<Btn
									type="submit"
									look="primary"
									outline="true"
									isLoading={this.props.mappingData}>Submit</Btn>
							</div>
	        </div>
				</div>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
		radiusIsUpdating: state.getIn(['appStatusReducer', 'radiusIsUpdating']),
		radius: state.getIn(['eventsReducer', 'radius']),
		dateRange: state.getIn(['eventsReducer', 'dateRange']),
    mappingData: state.getIn(['appStatusReducer', 'mappingData'])
	}
}

export default connect(mapStateToProps)(SearchFilters)
