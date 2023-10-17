import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext } from "react";
import { RoleContext } from "../../context/RoleContext";

const EditButton = ({ uid }) => {
  const navigate = useNavigate();
  const { role } = useContext(RoleContext);
  return (
    <button
      className="btn btn-info btn-sm px-3 m-auto h-2 "
      onClick={() => navigate(`/addons/${uid}/edit`)}
      disabled={role === "blocked"}
    >
      <WrenchScrewdriverIcon className="md:mr-1 w-4 h-4" />
      <span className="hidden md:block">Edit</span>
    </button>
  );
};

EditButton.propTypes = {
  uid: PropTypes.string,
};

export default EditButton;
