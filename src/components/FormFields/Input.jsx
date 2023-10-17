import PropTypes from "prop-types";
import { useState } from "react";

const fixedClassName = "input input-bordered input-sm md:input-md bg-base w-full max-w-xs";

const Input = ({
  handleChange,
  value,
  labelText,
  labelFor,
  id,
  name,
  type,
  isRequired = false,
  placeholder,
  customClass,
  max,
  min,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="my-5">
      <label htmlFor={labelFor} className="sr-only">
        {labelText}
      </label>
      <span className="relative">
        <input
          onChange={handleChange}
          value={value}
          id={id}
          name={name}
          type={inputType}
          required={isRequired}
          className={fixedClassName + customClass}
          placeholder={placeholder}
          max={max}
          min={min}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute top-1/2 transform -translate-y-1/2 right-3 text-xl md:text-2xl "
            onClick={handleTogglePassword}
          >
            {showPassword ? (
              <i className="bi bi-eye-slash"></i>
            ) : (
              <i className="bi bi-eye"></i>
            )}
          </button>
        )}
      </span>
    </div>
  );
};

Input.propTypes = {
  handleChange: PropTypes.func,
  value: PropTypes.string,
  labelText: PropTypes.string,
  labelFor: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  isRequired: PropTypes.bool,
  placeholder: PropTypes.string,
  customClass: PropTypes.string,
  max: PropTypes.any,
  min: PropTypes.any,
};

export default Input;
