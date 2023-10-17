import { useNavigate } from "react-router";
import Logo from "../SingleAddon/Logo";
import Badge from "../Badge/Badge";
import PropTypes from "prop-types";
import { stateBadgeColors } from "../../common/constants";
import RatingShort from "../SingleAddon/RatingShort";
import AdminActions from "./AdminActions";
import UserActions from "./UserActions";

const AddonListRow = ({ addonData, uid, reloadParent, role, loggedUser }) => {
  const navigate = useNavigate();
  return (
    <tr
      key={addonData}
      className="hover:bg-base-100 hover:cursor-pointer text-center border-b-2 border-base-300 "
    >
      <td
        className="text-sm md:text-lg md:p-6 p-3"
        onClick={() => navigate(`/addons/${uid}`)}
      >
        <div className="flex items-center space-x-3">
          <div className="mask mask-squircle w-16 md:w-24">
            <Logo user={addonData} url={addonData.logo} />
          </div>
          <div className="w-full">
            <span className="flex justify-between w-full mr-0">
              <div className="font-bold">{addonData.name}</div>
              <Badge
                className="font-thin"
                item={addonData.state}
                itemsSet={stateBadgeColors}
              />
            </span>
            <span className="flex justify-between w-full mr-0">
              <div className="opacity-70 text-start">{addonData.author}</div>
              <div className="opacity-70 text-start">{addonData.targetIDE}</div>
            </span>
          </div>
        </div>
      </td>
      <td onClick={() => navigate(`/addons/${uid}`)}>
        {" "}
        <div className="grid grid-rows-2 items-center text-sm md:text-md">
          <span className="opacity-70">Added on </span>
          <span className="font-bold">
            {addonData.addedOn
              ? new Date(addonData.addedOn).toLocaleDateString()
              : "unknown"}
          </span>
        </div>
      </td>
      <td className="font-bold" onClick={() => navigate(`/addons/${uid}`)}>
        <i className="bi bi-arrow-down-circle-fill mr-1"></i>{" "}
        {addonData.downloadedBy
          ? Object.keys(addonData.downloadedBy).length
          : 0}{" "}
      </td>
      <td>
        <RatingShort addonID={uid} />
      </td>
      <td>
        {role === "admin" && (
          <AdminActions
            state={addonData.state}
            reloadParent={reloadParent}
            uid={uid}
            loggedUser={loggedUser}
            author={addonData.author}
            name={addonData.name}
          />
        )}
        {role === "user" && <UserActions uid={uid} />}
      </td>
    </tr>
  );
};

AddonListRow.propTypes = {
  addonData: PropTypes.object,
  uid: PropTypes.string,
  loggedUser: PropTypes.string,
  reloadParent: PropTypes.func,
  role: PropTypes.string,
};

AddonListRow.defaultProps = {
  reloadParent: () => {},
};

export default AddonListRow;
