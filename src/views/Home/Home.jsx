import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import Header from "../../components/FormFields/Header";
import { RecentlyUploadedAddons } from "../../components/PublicSelectedAddons/RecentlyUploadedAddons";
import { FeaturedAddons } from "../../components/PublicSelectedAddons/FeaturedAddons";
import { TrendingAddons } from "../../components/PublicSelectedAddons/TrendingAddons";
import { homeSEO } from "../../common/reactHelmet";
import ReactHelmet from "../../components/Helmet/ReactHelmet";
import Slide from "react-reveal/Slide";
import Zoom from "react-reveal/Zoom";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();
  //const { user, userData } = useContext(AuthContext);

  return (
    <>
      <ReactHelmet view={homeSEO} />
      <div className="grid  grid-cols-1 md:grid-cols-1 w-screen gap-4 p-2 mr-2">
        {(
          <Zoom>
            <div className="hero min-h-[36vh] ">
              <div className="text-center">
                <Header
                  heading="Elevate your software development experience"
                  paragraph="Welcome to the IDE extensions marketplace with the best user experience!"
                />
                <div
                    className="justify-center"
                >
                  <button
                  onClick={() => navigate("/browse")}
                  className="btn btn-primary max-w-sm mr-auto mt-10 ml-auto"
                >
                  Browse catalog
                </button>
                </div>
              </div>
            </div>
          </Zoom>
        )}
        <Slide left >
          <div className="card bg-base-300">
            <Header
              className="flex justify-left"
              heading={"Recently uploaded addons"}
              paragraph={"The latest additions to our registry"}
            ></Header>
            <RecentlyUploadedAddons username={userData?.username} />
            <br></br>
          </div>
        </Slide>
        <Slide right delay={300}>
          <div className="card bg-base-300">
            <Header
              className="flex justify-left"
              heading={"Featured addons"}
              paragraph={"Recommended by our admins"}
            ></Header>
            <FeaturedAddons username={userData?.username} />
            <br></br>
          </div>
        </Slide>
        <Slide bottom>
          <div className="card bg-base-300">
            <Header
              className="flex justify-left"
              heading={"Popular addons"}
              paragraph={"The most-rated addons by our users"}
            ></Header>
            <TrendingAddons username={userData?.username} />
          </div>
        </Slide>
        <br></br>
      </div>
    </>
  );
};
