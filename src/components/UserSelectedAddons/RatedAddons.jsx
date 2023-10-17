import { useEffect, useState } from "react";
import PropTypes from "prop-types";
//import { AddonCard } from "../AddonCard/AddonCard";
import { getUserReviews } from "../../services/users.service";
import { getAddonsFromIdList } from "../../services/addon.service";

import { ScrollMenu } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";

import { LeftArrow, RightArrow } from "../CarouselElements/Arrows";
import { Card } from "../CarouselElements/Card";
import usePreventBodyScroll from "../CarouselElements/usePreventBodyScroll";
import "../CarouselElements/hideScrollbar.css"
import { onWheel } from "../CarouselElements/onWheelHelper.js"

export const RatedAddons = ({ username }) => {
  const [addons, setAddons] = useState([]);
  const { disableScroll, enableScroll } = usePreventBodyScroll();

  useEffect(() => {
    async function fetchAddons() {
      try {
        const userAddonsIds = await getUserReviews(username);
        const userAddons = await getAddonsFromIdList(userAddonsIds);
        setAddons(userAddons);
      } catch (error) {
        console.error("Error fetching addons downloaded by current user: ", error);
      }
    }

    fetchAddons();
  }, []);

  return (
    <>
    <div>
    <div className="example overflow-x-auto">
      {addons.length === 0 && (
        <p>It looks like you haven&apos;t reviewed any addons yet.</p>
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
            .sort((a, b) => b.addedOn - a.addedOn)
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
    {/*<div key={username} className="carousel rounded-box gap-x-8">
      {addons.length === 0 && (
        <p>It looks like you haven&apos;t reviewed any addons yet.</p>
      )}

      {addons
        .sort((a, b) => b.addedOn - a.addedOn)
        .map((addon) => {
          return (<AddonCard key={addon.id} className="carousel-item" addon={addon} username={username} />);
        })}
      </div>*/}
    </>
  );
};

RatedAddons.propTypes = {
  username: PropTypes.string,
};
