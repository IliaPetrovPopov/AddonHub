import { useParams } from "react-router";
import UserAddons from "./UserAddons";
import UserDetails from "./UserDetails";
import { useState } from "react";
import AddonList from "../AddonList/AddonList";
import { Helmet } from "react-helmet-async";

const UserDashboard = () => {
  const { username } = useParams();
  const [activeComponent, setActiveComponent] = useState("dashboard");

  const renderComponent = () => {
    switch (activeComponent) {
      case "dashboard":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 w-[95vw] mr-auto ml-auto gap-4 p-2 mr-2">
            <UserDetails className="col-span-1" username={username} />
            <UserAddons className="cols-span-1 md:col-span-2 " username={username} />
          </div>
        );
      case "addons":
        return <AddonList role="user" username={username} />;
      default:
        return (
          <span>
            <UserDetails username={username} />;
            <UserAddons username={username} />
          </span>
        );
    }
  };

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="gap-3 mt-3 md:mt-8">
        <span className="join flex justify-center mb-3">
          <button
            className={`btn join-item ${
              activeComponent === "dashboard" ? "btn-primary" : ""
            }`}
            onClick={() => setActiveComponent("dashboard")}
          >
            <i className="bi bi-person-vcard mr-2"></i>Dashboard
          </button>{" "}
          <button
            className={`btn join-item ${
              activeComponent === "addons" ? "btn-primary" : ""
            }`}
            onClick={() => setActiveComponent("addons")}
          >
            <i className="bi bi-cloud-upload mr-2"></i>My addons
          </button>{" "}
        </span>
        <div>{renderComponent()}</div>
      </div>
    </>
  );
};

export default UserDashboard;
