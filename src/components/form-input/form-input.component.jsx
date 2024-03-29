import React from "react";

import "./form-input.styles.scss";

const FormInput = ({ handleChange, label, ...otherProps }) => {
  return (
    <div>
      <div className="group">
        <input className="form-input" onChange={handleChange} {...otherProps} />
        {label ? (
          <label
            className={`${
              otherProps.value.length ? "shrink" : ""
            } form-input-label`}
          >
            {label}
          </label>
        ) : null}
      </div>
    </div>
  );
};

export default FormInput;
