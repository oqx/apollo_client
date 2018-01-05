import React from "react";
import PropTypes from "prop-types";

const IconBtn = props => {
  const { iconClass, controlFunc } = props;

  return (
    <div className="icon icon__default" role="button" onClick={controlFunc}>
      <i className={iconClass} />
    </div>
  );
};

IconBtn.propTypes = {
  iconClass: PropTypes.string.isRequired,
  controlFunc: PropTypes.func
};

export default IconBtn;
