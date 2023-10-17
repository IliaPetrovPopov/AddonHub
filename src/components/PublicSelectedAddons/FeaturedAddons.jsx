import { useEffect, useState } from "react";
import { getFeaturedAddons } from "../../services/addon.service";
import PropTypes from "prop-types";
//import { AddonCard } from "../AddonCard/AddonCard";

import { ScrollMenu } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";

import { LeftArrow, RightArrow } from "../CarouselElements/Arrows";
import { Card } from "../CarouselElements/Card";
import usePreventBodyScroll from "../CarouselElements/usePreventBodyScroll";
import "../CarouselElements/hideScrollbar.css"
import { onWheel } from "../CarouselElements/onWheelHelper.js"


export const FeaturedAddons = ({ username }) => {
  const [addons, setAddons] = useState([]);
  const { disableScroll, enableScroll } = usePreventBodyScroll();

  useEffect(() => {
    async function fetchAddons() {
      try {
        const featuredAddons = await getFeaturedAddons();
        setAddons(featuredAddons);
      } catch (error) {
        console.error("Error fetching featured addons: ", error);
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
            {addons
            .sort((a, b) => b.createdOn - a.createdOn)
            .map((addon) => {return (
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
      {addons.length === 0 && (
        <p>Nothing to see here right now. Come back soon.</p>
      )}

      {addons
        .sort((a, b) => b.createdOn - a.createdOn)
        .map((addon) => {
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
FeaturedAddons.propTypes = {
  username: PropTypes.string,
};
