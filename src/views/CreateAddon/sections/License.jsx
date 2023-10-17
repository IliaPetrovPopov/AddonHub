import PropTypes from "prop-types";

const License = ({ handleChange }) => {
  return (
    <div className="form-control w-full max-w-xs">
      <span id="license-wrapper">
        <i className="bi bi-pencil-square"></i>
        <span className="info-wrapper">
          {" "}
          License
          <span
            className="tooltip tooltip-right tooltip-info"
            data-tip="Upload the addon that you want to be added to the website"
          >
            <i className="bi bi-info-circle icon-on-section"></i>
          </span>
        </span>{" "}
        <br />
        <br />
      </span>

      <textarea
        className="textarea textarea-bordered h-24"
        placeholder="Type here..."
        onChange={handleChange("license")}
      />
    </div>
  );
};

License.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default License;
