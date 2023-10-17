import PropTypes from "prop-types";

const BasicInformation = ({ handleChange, placeholder }) => {
  return (
    <div className="basic-information">

      <div className="form-control w-full ">
        <label className="label">
          <span className="label-text">
            Name
            <span className="text-error"> * </span>
            <span
              className="tooltip tooltip-right tooltip-info"
              data-tip="Name of the addon to be uploaded"
            >
              <i className="bi bi-info-circle icon-inside-section"></i>
            </span>
          </span>
        </label>

        <input
          type="text"
          placeholder={placeholder !== "" ? placeholder : "Type here..."}
          className="input input-bordered input-sm md:input-md w-full"
          onChange={handleChange("name")}
        />
      </div>
    </div>
  );
};

BasicInformation.propTypes = {
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default BasicInformation;
