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
  let newArray = [];

  options.map(option => {
    return newArray.push(moment(option.date).format("YYYY-MM-DD"));
  });
  const distinctDate = [...new Set(newArray)];

  const selectOptions = distinctDate.map((option, index) => (
    <option key={index} value={option}>
      {" "}
      {option}{" "}
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
        <option>Choose By Date</option>
        {selectOptions}
      </select>
    </div>
  );
};
export default TextFormSelect;
