import PropTypes from "prop-types";
const SaveButton = ({ handleSubmit }) => {
  return (
    <button className="btn btn-primary btn-sm md:btn-md col-start-4" onClick={handleSubmit}>
      Save
    </button>
  );
};

SaveButton.propTypes = {
  handleSubmit: PropTypes.func,
};

SaveButton.defaultProps = {
  handleSubmit: () => {},
};

export default SaveButton;
