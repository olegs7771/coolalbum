import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const TextFormGroup = ({
  label,
  placeholder,
  type,
  info,
  value,
  name,
  onChange,
  error,
  message
}) => {
  return (
    <div className="form-group ">
      <label htmlFor={name}>{label}</label>
      <input
        className={classnames(
          "form-control",
          { "is-invalid": error },
          { "is-valid": message }
        )}
        placeholder={placeholder}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        style={{ marginTop: "-2rem" }}
      />
      {error && <div className="invalid-feedback">{error}</div>}
      {message && <div className="valid-feedback">{message}</div>}

      <small className="text-muted"> {info}</small>
    </div>
  );
};

TextFormGroup.defaultProps = {
  type: "text"
};

TextFormGroup.propTypes = {
  placeholder: PropTypes.string
};

export default TextFormGroup;
