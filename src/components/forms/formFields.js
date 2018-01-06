import React from "react";

export default class FormField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error !== this.props.error) {
      this.setState({ error: nextProps.error });
    }
  }

  render() {
    const field = (
      <input
        type={this.props.type}
        placeholder={this.props.placeholder}
        className={
          "form@field__input" + (this.state.error ? " form@field--error" : "")
        }
        name={this.props.name}
        maxLength={this.props.maxLength}
        min={this.props.min}
        max={this.props.max}
        onChange={this.props.controlFunc}
      />
    );

    return (
      <div className="form@field">
        <label className="form@field__label">{this.props.label}</label>

        {this.props.children ? (
          <div className="form@field__group">
            {field}
            {this.props.children}
          </div>
        ) : (
          field
        )}
      </div>
    );
  }
}
