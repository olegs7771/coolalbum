import React from "react";

export default function TextFormCheckbox(props) {
  return (
    <div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <input
              type="checkbox"
              aria-label="Checkbox for following text input"
              onChange={props.onChange}
            />
          </div>
        </div>
        <div>
          <span className="ml-2">{props.text}</span>
        </div>
      </div>
    </div>
  );
}
