import PropTypes from "prop-types";

const Description = ({ handleChange, placeholder }) => {
  return (
    <div className="md:col-span-2 form-control w-full">
      <label className="label">
        <span className="label-text">
          Description
          <span className="text-error"> * </span>
          <span
            className="tooltip tooltip-right tooltip-info"
            data-tip="Description about the addon you want to upload"
          >
            <i className="bi bi-info-circle icon-inside-section"></i>
          </span>
        </span>
      </label>
      <textarea
        className="textarea textarea-bordered w-full h-24"
        placeholder={placeholder !== '' ? placeholder : 'Type here...'}
        onChange={handleChange("description")}
      ></textarea>
    </div>
  );
};

Description.propTypes = {
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default Description;
