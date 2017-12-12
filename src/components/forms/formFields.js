import React from 'react'

export default function FormField(props) {
  const field = <input
            type={props.type}
            placeholder={props.placeholder}
            className="form@field__input"
            name={props.name}
            maxLength={props.maxLength}
            min={props.min}
            max={props.max}
						onChange={props.controlFunc}
            />

    return (
      <div className="form@field">
        <label className="form@field__label">{props.label}</label>

          {props.children ? <div className="form@field__group">
              {field}
              {props.children}
          </div> : field}

      </div>
    )
}
