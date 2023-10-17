import PropTypes from "prop-types";

const FormExtraSignUp = ({ isChecked, handleCheckboxChange }) => {
  return (
    <div className="flex ">
      <div className="flex ml-1">
        <input
          id="agree"
          name="agree"
          type="checkbox"
          required
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="remember-me" className="ml-2 block text-sm">
          I agree to the{" "}
          <a
            className="underline"
            href="./AddonHub_Terms_and_Conditions.docx"
          >
            {" "}
            Terms and Conditions
          </a>
        </label>
      </div>
    </div>
  );
};

FormExtraSignUp.propTypes = {
  isChecked: PropTypes.any,
  handleCheckboxChange: PropTypes.any,
};

export default FormExtraSignUp;
