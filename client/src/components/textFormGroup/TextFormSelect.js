import React from "react";

import moment from "moment";

const TextFormSelect = ({
  name,
  value,
  placeholder,
  onChange,

  options,
  type
}) => {
  const selectOptions = options.map((option, index) => (
    <option key={index} value={moment(option.date).format("DD/MM/YYYY")}>
      {" "}
      {moment(option.date).format("DD/MM/YYYY")}{" "}
    </option>
  ));

  return (
    <div className="group-control my-2 ">
      <select
        type={type}
        className="custom-select"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      >
        <option>Choose Date</option>
        {selectOptions}
      </select>
    </div>
  );
};
export default TextFormSelect;
