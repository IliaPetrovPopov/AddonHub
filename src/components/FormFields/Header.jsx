import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Header = ({ heading, paragraph, linkName, linkUrl = "#" }) => {
  return (
    <div className="mb">
      <div className="flex justify-center"></div>
      <h2 className="mt-6 text-center font-extrabold ">{heading}</h2>
      <h5 className="mt-2 text-center mt-3 md:mt-5">
        {paragraph}{" "}
        <Link to={linkUrl} className="font-medium hover:text-accent">
          {linkName}
        </Link>
      </h5>
    </div>
  );
};

Header.propTypes = {
  heading: PropTypes.string,
  paragraph: PropTypes.string,
  linkName: PropTypes.string,
  linkUrl: PropTypes.string,
};

export default Header;
