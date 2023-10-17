import PropTypes from "prop-types";

const Tag = ({ name, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="py-1 px-1 md:px-3 text-xs md:text-sm mr-1 mb-1 bg-base-300 border shadow border-primary rounded-box indicator cursor-pointer"
    >
      {name}
    </div>
  );
};

Tag.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func,
};

export default Tag;
