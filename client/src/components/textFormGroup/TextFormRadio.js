import React from "react";

function TextFormRadio(props) {
  return (
    <div>
      <div className="input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <input
              type="radio"
              aria-label="Radio button for following text input"
            />
          </div>
        </div>
        <input
          type="text"
          className="form-control"
          aria-label="Text input with radio button"
        />
      </div>
    </div>
  );
}

export default TextFormRadio;
