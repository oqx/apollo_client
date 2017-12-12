import React from 'react'
import PropTypes from 'prop-types';

const SelectField = (props) => {
	const { name,
					label,
					controlFunc,
					array,
					value } = props

  return (
    <div className="form@field form@field__select">
      <label className="form@field__label">{label}</label>

      <select
				value={value}
        className="form@field__input"
        name={name}
				onChange={controlFunc}>
        {(array.map((item, i) => {
          return <option value={item} key={i}>{item}</option>
        }))}
      </select>
    </div>
  )
}

SelectField.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	controlFunc: PropTypes.func.isRequired,
	array: PropTypes.array.isRequired
}

export default SelectField
