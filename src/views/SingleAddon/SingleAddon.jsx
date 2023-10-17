import { useParams } from "react-router";
import { getAddonById } from "../../services/addon.service";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { convertSize } from "../../common/helperFunctions/sizeConverter";
import DownloadButton from "../../components/SingleAddon/DownloadButton";
import EditButton from "../../components/SingleAddon/EditButton";
import RatingShort from "../../components/SingleAddon/RatingShort";
import GitHubDetails from "../../components/SingleAddon/GitHubDetails";
import FullDescription from "../../components/SingleAddon/FullDescription";
import Logo from "../../components/SingleAddon/Logo";
import RatingLong from "../../components/SingleAddon/RatingLong";
import { RoleContext } from "../../context/RoleContext";
import ApproveButton from "../../components/AdminButtons/ApproveButton";
import DisableButton from "../../components/AdminButtons/DisableButton";
import Badge from "../../components/Badge/Badge";
import { stateBadgeColors, visibleAddons } from "../../common/constants";
import FeatureButton from "../../components/AdminButtons/FeatureButton";
import UnfeatureButton from "../../components/AdminButtons/UnfeatureButton";
import Tag from "../../components/Tag/Tag";
import BuyButton from "../../components/BuyButton/BuyButton";
import ReactHelmet from "../../components/Helmet/ReactHelmet";
import { singleAddonSeo } from "../../common/reactHelmet";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { getUserData } from "../../services/users.service";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase-config";

const SingleAddonView = () => {
  const { role } = useContext(RoleContext);
  // eslint-disable-next-line no-unused-vars
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const { uid } = useParams();
  const [addon, setAddon] = useState("");
  const [path, setPath] = useState("");
  const [size, setSize] = useState(0);
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (user === null) return;

      try {
        const snapshot = await getUserData(user.uid);

        if (snapshot.exists()) {
          setUserData(Object.values(snapshot.val())[0]);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    const fetchAddon = async () => {
      const addOn = await getAddonById(uid);
      setPrice(addon?.price?.slice(1));
      setAddon(addOn);
      setPath(addOn.gitHubLink);
      setIsLoading(false);
    };

    fetchAddon();
  }, [isLoading, userData]);

  const handleSizeChange = (size) => {
    const convertedSize = convertSize(size);
    setSize(convertedSize);
  };

  if (addon) {
    return (
      <>
        <ReactHelmet view={singleAddonSeo} title={addon.name} />
        <div className="px-3 mt-4 md:mt-8 md:px-10">
          <div className="grid w-full p-2 md:py-6 px-4 md:px-8 bg-base-200 rounded-xl shadow-xl">
            <div className="flex gap-1 md:gap-3 ">
              <div className="flex items-center justify-center w-1/5">
                <Logo url={addon.logo} />
              </div>
              <div className="w-full">
                <span className="flex justify-between md:gap-0 gap-2">
                  <span className="flex gap-2 md:gap-3 items-center">
                    <h3 className="font-semibold ">{addon.name}</h3>
                    {role === "admin" && (
                      <Badge item={addon.state} itemsSet={stateBadgeColors} />
                    )}{" "}
                  </span>
                  <span className="flex items-center ">
                    {visibleAddons.includes(addon.state) && userData ? (
                      visibleAddons.includes(addon.state) &&
                      (price === "0.00" || role === "admin" || addon?.author === userData?.username ? (
                        <DownloadButton
                          uid={uid}
                          name={addon.name}
                          username={userData?.username}
                        />
                      ) : userData?.boughtAddons?.includes(addon.name) ? (
                        <DownloadButton
                          uid={uid}
                          name={addon.name}
                          username={userData?.username}
                        />
                      ) : (
                        <BuyButton
                          priceOfAddon={price}
                          addonName={addon.name}
                        />
                      ))
                    ) : price === "0.00" ? (
                      <DownloadButton
                        uid={uid}
                        name={addon.name}
                        username={userData?.username}
                      />
                    ) : (
                      <div className="badge badge-warning mr-3 p-3">
                        <div className="flex items-center">
                          <ExclamationTriangleIcon className="md:mr-1 w-4 h-4" />
                          <span className="md:block">Log In to buy addon</span>
                        </div>
                      </div>
                    )}
                    <div className="dropdown dropdown-end">
                      <label tabIndex={0} className="btn w-3">
                        <i className="bi bi-three-dots-vertical text-2xl"></i>
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content grid gap-2 z-[1] menu shadow bg-base-100 rounded-box w-fit"
                      >
                        <div className="grid gap-2">
                          {userData &&
                            (role === "admin" ||
                              userData.username === addon.author) && (
                              <li>
                                <EditButton uid={uid} />
                              </li>
                            )}
                          {userData &&
                            (role === "admin" ||
                              userData.username === addon.author) && (
                              <li>
                                <DeleteButton uid={uid} />
                              </li>
                            )}
                          {role === "admin" && (
                            <>
                              {addon.state === "pending" && (
                                <li>
                                  <ApproveButton
                                    uid={uid}
                                    reloadParent={() =>
                                      setIsLoading(!isLoading)
                                    }
                                    label="Approve"
                                  />
                                </li>
                              )}
                              {addon.state === "approved" && (
                                <>
                                  <li>
                                    <FeatureButton
                                      uid={uid}
                                      reloadParent={() =>
                                        setIsLoading(!isLoading)
                                      }
                                    />
                                  </li>
                                  <li>
                                    <DisableButton
                                      uid={uid}
                                      reloadParent={() =>
                                        setIsLoading(!isLoading)
                                      }
                                    />
                                  </li>
                                </>
                              )}
                              {addon.state === "disabled" && (
                                <li>
                                  <ApproveButton
                                    uid={uid}
                                    reloadParent={() =>
                                      setIsLoading(!isLoading)
                                    }
                                    label="Enable"
                                  />
                                </li>
                              )}
                              {addon.state === "featured" && (
                                <li>
                                  <UnfeatureButton
                                    uid={uid}
                                    reloadParent={() =>
                                      setIsLoading(!isLoading)
                                    }
                                  />
                                </li>
                              )}
                            </>
                          )}
                        </div>
                      </ul>
                    </div>
                  </span>
                </span>{" "}
                <span className="flex items-center gap-1 ">
                  <RatingShort addonID={uid} />{" "}
                  <i className="fa-solid fa-download ml-3 "></i>
                  <div className="text-sm md:text-lg">
                    {addon.downloadedBy
                      ? Object.keys(addon.downloadedBy).length
                      : 0}{" "}
                  </div>
                </span>
                <div className="flex items-center mt-1 gap-2">
                  {size > 0 && <h5 className="font-semibold">size: {size}</h5>}
                  <h5>
                    <Link
                      to={`/users/${addon.author}`}
                      className="font-light hover:text-accent "
                    >
                      || posted by {addon.author}
                    </Link>
                  </h5>
                </div>
              </div>
            </div>
            <div className="divider" />
            <div className="w-[89vw] md:w-[90vw]">
              <div className="grid grid-cols-2 grid-rows-3 gap-1 md:grid-cols-4 md:grid-rows-2">
                <h5 className="mb-3 col-span-1 row-start-1 row-span-2 md:col-span-4">
                  {" "}
                  <h5 className="font-semibold">About</h5>
                  {addon.description}
                </h5>
                <div className="col-span-1 row-start-3 md:col-start-1">
                  {addon.tags &&
                    addon.tags?.map((t) => <Tag key={t} name={t} />)}
                </div>
                <GitHubDetails pathUrl={path} onSizeChange={handleSizeChange} />
              </div>
              <div className="divider" />
              <div className="row-span-1 col-span-2">
                <RatingLong uid={uid} />
              </div>
              <div className="divider" />
              <FullDescription pathUrl={path} />
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default SingleAddonView;
