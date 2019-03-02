import React from "react";
import PropTypes from "prop-types";

const TextFormGroup = ({ placeholder, type, info }) => {
  return (
    <div className="form-group">
      <input className="form-control" placeholder={placeholder} type={type} />
      <small className="text-muted"> {info}</small>
    </div>
  );
};

TextFormGroup.defaultProps = {
  type: "text"
};

TextFormGroup.propTypes = {
  placeholder: PropTypes.string.isRequired
};

export default TextFormGroup;
