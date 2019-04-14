import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const TextAreaFormGroup = ({
  label,
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
      <label htmlFor={name}>{label}</label>
      <textarea
        name={name}
        value={value}
        cols="20"
        rows="5"
        onChange={onChange}
        className={classnames("form-control", { "is-invalid": error })}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextAreaFormGroup.defaultProps = {
  type: "text"
};

TextAreaFormGroup.propTypes = {
  placeholder: PropTypes.string
};

export default TextAreaFormGroup;
