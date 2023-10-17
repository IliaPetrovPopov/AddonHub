import PropTypes from "prop-types";

const Origin = ({ handleChange }) => {
  return (
    <div className="form-control w-full ">
      <label className="label">
        <span className="label-text">
          Origin
          <span className="text-error"> * </span>
          <span
            className="tooltip tooltip-right tooltip-info"
            data-tip="The github repo, which is hosting the addon"
          >
            <i className="bi bi-info-circle icon-inside-section"></i>
          </span>
        </span>
      </label>
      <input
        type="text"
        placeholder="https://github.com/profile/project/"
        className="input input-bordered input-md w-full"
        onChange={handleChange("gitHubLink")}
      />
    </div>
  );
};

Origin.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default Origin;
