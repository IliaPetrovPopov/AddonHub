import { useNavigate } from "react-router-dom";
import ThemeToggle from "../ThemeToggler/ThemeToggler";

const NavBarMain = () => {
  const navigate = useNavigate();
  return (
    <span className="flex space-x-2 md:space-x-4">
      <ThemeToggle />
      <div
        className="btn hidden md:flex p-0 btn-ghost normal-case font-extrabold"
        // onClick={() => navigate("/")}
      >
        <span tabIndex={0} className=" btn btn-secondary btn-circle">
          <img src="./addonhub-logo.png" />
        </span>
        <h3 onClick={() => navigate("/")} className="">
          AddonHub
        </h3>
      </div>
      <div className="dropdown mt-1 md:hidden content-center">
        <label tabIndex={0} className="btn btn-secondary btn-circle">
          <img src="./addonhub-logo.png" />
        </label>
        <ul
          tabIndex={0}
          className="mt-3 z-[1] p-1 w-fit shadow-lg dropdown-content bg-base-100 border-2 border-base-300 rounded-box"
        >
          <li
            className="btn btn-ghost btn-sm w-full normal-case"
            onClick={() => navigate("/browse")}
          >
            Browse
          </li>
        </ul>
      </div>
    </span>
  );
};

export default NavBarMain;
