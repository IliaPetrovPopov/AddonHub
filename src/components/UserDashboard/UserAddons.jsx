import PropTypes from "prop-types";
import { useState } from "react";
import { DownloadedAddons } from "../../components/UserSelectedAddons/DownloadedAddons";
import { RatedAddons } from "../UserSelectedAddons/RatedAddons";
import { YetToRateAddons } from "../UserSelectedAddons/YetToRateAddons";

const UserAddons = ({ username }) => {
  const color = "primary";
  const [openTab, setOpenTab] = useState(1);
  return (
    <div className="card shadow-xl rounded-xl col-span-1 md:col-span-2 bg-base-300 p-2">
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex justify-center join mb-0 list-none pt-3 pb-4"
            role="tablist"
          >
            <li className="-mb-px last:mr-0 text-center">
              <a
                className={
                  "join-item max-w-[10rem] text-xs font-bold uppercase px-2 md:px-4 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 1
                    ? "bg-primary border border-primary"
                    : "border bg-base border-" + color)
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                Downloaded
              </a>
            </li>
            <li className="-mb-pxlast:mr-0 text-center">
              <a
                className={
                  "join-item max-w-[10rem] text-xs font-bold uppercase px-2 md:px-4 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 2
                    ? "bg-primary border border-primary"
                    : "border bg-base border-" + color)
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                Rated
              </a>
            </li>
            <li className="-mb-px  last:mr-0 text-center">
              <a
                className={
                  "join-item max-w-[10rem] text-xs font-bold uppercase px-2 md:px-4 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 3
                    ? "bg-primary border  border-primary"
                    : "border bg-base border-" + color)
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                Yet to review
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words w-full ">
            <div className=" py-4 ">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <DownloadedAddons username={username} />
                </div>

                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <RatedAddons username={username} />
                </div>
              </div>

              <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                <YetToRateAddons username={username} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAddons;

UserAddons.propTypes = {
  username: PropTypes.string,
};
