import React from "react";
import PropTypes from "prop-types";

const TextFormGroup = ({ placeholder, type, info, value, name, onChange }) => {
  return (
    <div className="form-group">
      <input
        className="form-control"
        placeholder={placeholder}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
      />
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
