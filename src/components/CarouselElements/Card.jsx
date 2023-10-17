//import { VisibilityContext } from "react-horizontal-scrolling-menu";
//import { useContext } from "react";
import PropTypes from "prop-types";
import { AddonCard } from "../AddonCard/AddonCard";


export const Card = ({ addon, username }) => {
  //const visibility = useContext(VisibilityContext);

  //const visible = visibility.isItemVisible(itemId);

  return (
    <div
      role="button"
      style={{
        //border: "1px solid",
        display: "flex",
        margin: "0 10px",
        userSelect: "none",
      }}
      tabIndex={0}
      className="p-2"
    >
        <AddonCard addon={addon} username={username} />
    </div>
  );
}

Card.propTypes = {
    addon: PropTypes.object,
    username: PropTypes.string,
};
