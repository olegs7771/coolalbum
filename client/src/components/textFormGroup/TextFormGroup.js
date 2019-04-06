import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const TextFormGroup = ({
  placeholder,
  type,
  info,
  value,
  name,
  onChange,
  error
}) => {
  return (
    <div className="form-group">
      <input
        className={classnames("form-control", { "is-invalid": error })}
        placeholder={placeholder}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}

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
