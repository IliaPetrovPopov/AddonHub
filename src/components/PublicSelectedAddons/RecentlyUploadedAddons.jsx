import { useEffect, useState } from "react";
import { getRecentlyUploadedAddons } from "../../services/addon.service";
import PropTypes from "prop-types";
//import { AddonCard } from "../AddonCard/AddonCard";

import { ScrollMenu } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";

import { LeftArrow, RightArrow } from "../CarouselElements/Arrows";
import { Card } from "../CarouselElements/Card";
import usePreventBodyScroll from "../CarouselElements/usePreventBodyScroll";
import "../CarouselElements/hideScrollbar.css"
import { onWheel } from "../CarouselElements/onWheelHelper.js"

export const RecentlyUploadedAddons = ({ username }) => {
  const [addons, setAddons] = useState([]);
  const { disableScroll, enableScroll } = usePreventBodyScroll();

  useEffect(() => {
    async function fetchAddons() {
      try {
        const recentlyUploadedAddons = await getRecentlyUploadedAddons();
        setAddons(recentlyUploadedAddons);
      } catch (error) {
        console.error("Error fetching recently uploaded addons: ", error);
      }
    }

    fetchAddons();
  }, []);

  return (
    <>
    <div>
    <div className="example p-4 overflow-x-auto">
      {addons.length === 0 && (
        <p>Nothing to see here right now. Come back soon.</p>
      )}
        {addons.length !== 0 && (<div onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
          <ScrollMenu className="flex justify-space-around"
            Header={<div></div>}
            Footer={<div></div>}
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            onWheel={onWheel}
          >
            {addons.map((addon) => {return (
              <Card
                key={addon.id}
                addon={addon}
                username={username}
              />
            )})}
          </ScrollMenu>
        </div>)}
      </div>

    </div>
    {/*<div className="carousel rounded-box">
      {
        //<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      }

      {addons.length === 0 && (
        <p>Nothing to see here right now. Come back soon.</p>
      )}

      {addons
        .sort((a, b) => b.addedOn - a.addedOn)
        .map((addon) => {
          return (
            <AddonCard
              key={addon.id}
              className="carousel-item"
              addon={addon}
              username={username}
            />
          );
        })}
      </div>*/}
    </>
  );
};
RecentlyUploadedAddons.propTypes = {
  username: PropTypes.string,
};
