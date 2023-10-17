import EditButton from "../SingleAddon/EditButton";
import PropTypes from "prop-types";

const UserActions = ({ uid }) => {
  return (
    <center>
      <EditButton uid={uid} />
    </center>
  );
};


UserActions.propTypes = {
  uid: PropTypes.string,
};


export default UserActions;
