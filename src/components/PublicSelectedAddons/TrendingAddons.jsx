import { useEffect, useState } from "react";
import { getAllAddons } from "../../services/addon.service";
import PropTypes from "prop-types";
//import { AddonCard } from "../AddonCard/AddonCard";
import { avgRating } from "../../common/helperFunctions/averageRating";
import { ADDONS_PER_TAB_ON_HOME_PAGE } from "../../common/constants";
import { getAddonReviews } from "../../services/rating.service";

import { ScrollMenu } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";

import { LeftArrow, RightArrow } from "../CarouselElements/Arrows";
import { Card } from "../CarouselElements/Card";
import usePreventBodyScroll from "../CarouselElements/usePreventBodyScroll";
import "../CarouselElements/hideScrollbar.css"
import { onWheel } from "../CarouselElements/onWheelHelper.js"

export const TrendingAddons = ({ username }) => {
  const [addons, setAddons] = useState([]);
  const [addonsWithRatings, setAddonsWithRatings] = useState([]);
  const [sortedAddons, setSortedAddons] = useState([]);
  const { disableScroll, enableScroll } = usePreventBodyScroll();

  useEffect(() => {
    async function fetchAllAddons() {
      try {
        const {addons: allAddons} = await getAllAddons();
        setAddons(allAddons);
      } catch (error) {
        console.error("Error fetching all addons: ", error);
      }
    }

    fetchAllAddons();
  }, []);

  useEffect(() => {
    async function processRatings() {
      const addonsWithAvgRatingsPromises = addons.map(async (addon) => {
        try {
          const addonRatingsAllData = await getAddonReviews(addon.id);
          const addonRatings = addonRatingsAllData.ratings;
          const addonAvgRating = Math.round(avgRating(addonRatings));
          addon.avgRating = addonAvgRating;
          return addon;
        } catch (error) {
          console.error("Error fetching ratings for addon: ", error);
        }
      });

      const addonsWithAvgRatings = await Promise.all(
        addonsWithAvgRatingsPromises
      );
      setAddonsWithRatings(addonsWithAvgRatings);
    }

    processRatings();
  }, [addons]);

  useEffect(() => {
    const sortedAddonsArray = addonsWithRatings
      .sort((a, b) => {
        return b.avgRating - a.avgRating;
      })
      .slice(0, ADDONS_PER_TAB_ON_HOME_PAGE + 1);

    setSortedAddons(sortedAddonsArray);
  }, [addonsWithRatings]);

  return (
    <>
    <div>
    <div className="example p-4 overflow-x-auto">
      {sortedAddons.length === 0 && (
        <p>Nothing to see here right now. Come back soon.</p>
      )}
      {sortedAddons.length !== 0 && (<div onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
          <ScrollMenu classNam="flex justify-space-around"
            Header={<div></div>}
            Footer={<div></div>}
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            onWheel={onWheel}
          >
            {sortedAddons.map((addon) => {return (
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
      {sortedAddons.length === 0 && (
        <p>Nothing to see here right now. Come back soon.</p>
      )}
      {sortedAddons.map((addon) => {
        return (
          <div key={addon.id} className="carousel-item">
            <AddonCard addon={addon} username={username} />
          </div>
        );
      })}
    </div>*/}
    </>
  );
};
TrendingAddons.propTypes = {
  username: PropTypes.string,
};
