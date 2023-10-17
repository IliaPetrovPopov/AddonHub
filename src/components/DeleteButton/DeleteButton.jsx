import { useNavigate } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/outline";
import { changeAddonData } from "../../services/addon.service";
import PropTypes from "prop-types";
import { useContext } from "react";
import { RoleContext } from "../../context/RoleContext";

const DeleteButton = ({ uid }) => {
  const navigate = useNavigate();
  const { role } = useContext(RoleContext);

  const handleDelete = async () => {
    navigate("/");
    await changeAddonData(uid, { state: "disabled" });
  };

  return (
    <>
      <button
        className="btn bg-red-500 btn-sm px-3 m-auto h-2 hover:bg-red-300"
        onClick={handleDelete}
        disabled={role === "blocked"}
      >
        <div className="flex items-center">
          <TrashIcon className="md:mr-1 w-4 h-4" />
          <span className="hidden md:block"> Delete</span>
        </div>
      </button>
    </>
  );
};

DeleteButton.propTypes = {
  uid: PropTypes.string,
};

export default DeleteButton;
