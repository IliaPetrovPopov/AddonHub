import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const FormAction = ({
  handleSubmit,
  type = "Button",
  text,
}) => {
  return (
    <>
      {type === "Button" ? (
        <button
          // type={action}
          className="btn btn-accent font-bold text-md md:text-lg w-full mt-10"
          onClick={handleSubmit}
        >
          {text}
        </button>
      ) : (
        <>
          <Link
            className="btn btn-accent font-bold text-md md:text-lg w-full mt-10"
            onClick={handleSubmit}
            to="/settings"
          >
            {text}
          </Link>
        </>
      )}
    </>
  );
};

FormAction.propTypes = {
  handleSubmit: PropTypes.func,
  type: PropTypes.any,
  action: PropTypes.string,
  text: PropTypes.string,
};

export default FormAction;
