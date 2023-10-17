import PropTypes from "prop-types";

const FileUpload = ({ handleFileUpload }) => {
  return (
    <div>
      {" "}
      <h5 className="font-semibold opacity-85 md:text-md">
        <i className="bi bi-pencil-square"></i>
        <span className="info-wrapper">
          {" "}
          Upload Addon
          <span className="text-error"> * </span>
          <span
            className="tooltip tooltip-right tooltip-info"
            data-tip="Upload the addon that you want to be added to the website"
          >
            <i className="bi bi-info-circle icon-on-section"></i>
          </span>
        </span>{" "}
      </h5>
      <input
        type="file"
        className="file-input mt-2 md:mt-4 file-input-bordered w-full md:w-1/2 file-input-sm md:file-input-md"
        accept=".zip, .rar, .jar"
        onChange={(e) => handleFileUpload(e)}
      />
    </div>
  );
};

FileUpload.propTypes = {
  handleFileUpload: PropTypes.func,
};

export default FileUpload;
