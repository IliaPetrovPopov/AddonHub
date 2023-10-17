import ApproveButton from "../AdminButtons/ApproveButton";
import DisableButton from "../AdminButtons/DisableButton";
import FeatureButton from "../AdminButtons/FeatureButton";
import UnfeatureButton from "../AdminButtons/UnfeatureButton";
import PropTypes from "prop-types";

const AdminActions = ({
  author,
  state,
  reloadParent,
  uid,
  loggedUser,
  name,
}) => {
  return (
    <center>
      {state === "pending" && (
        <ApproveButton
          uid={uid}
          reloadParent={reloadParent}
          label="Approve"
          loggedUser={loggedUser}
          author={author}
          addonName={name}
        />
      )}
      {state === "approved" && (
        <div className="grid grid-rows-2 justify-center gap-2">
          <FeatureButton
            uid={uid}
            reloadParent={reloadParent}
            loggedUser={loggedUser}
            author={author}
            addonName={name}
          />
          <DisableButton
            uid={uid}
            reloadParent={reloadParent}
            loggedUser={loggedUser}
            author={author}
            addonName={name}
          />
        </div>
      )}
      {state === "featured" && (
        <UnfeatureButton
          uid={uid}
          reloadParent={reloadParent}
          loggedUser={loggedUser}
          author={author}
          addonName={name}
        />
      )}
      {state === "disabled" && (
        <ApproveButton
          uid={uid}
          reloadParent={reloadParent}
          label="Enable"
          loggedUser={loggedUser}
          author={author}
          addonName={name}
        />
      )}
    </center>
  );
};
AdminActions.propTypes = {
  author: PropTypes.string,
  state: PropTypes.string,
  reloadParent: PropTypes.func,
  uid: PropTypes.string,
  loggedUser: PropTypes.string,
  name: PropTypes.string,
};

export default AdminActions;
