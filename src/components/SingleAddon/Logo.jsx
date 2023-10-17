import PropTypes from "prop-types";

const Logo = ({ url }) => {
  return <img className="max-h-[12vh] md:max-h-[15vh] rounded-xl" src={url} />;
};

Logo.propTypes = {
  url: PropTypes.string,
};

export default Logo;
