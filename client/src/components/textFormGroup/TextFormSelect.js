import React from "react";
import classnames from "classnames";

const TextFormSelect = ({
  name,
  value,
  placeholder,
  onChange,
  error,
  options,
  type
}) => {
  // const selectOptions = options.map(option => (

  //   // <option key={option.label} value={option.value} defaultValue={option.value}>
  //   //   {option.label}
  //   // </option>
  // ));

  return (
    <div className="group-control mt-2 ">
      <select
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      >
        {/* {selectOptions} */}
        <option value="1">1</option>
      </select>

      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};
export default TextFormSelect;
