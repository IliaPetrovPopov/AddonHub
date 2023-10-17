import { useState, useEffect } from "react";
import {
  getApprovedAddonsSnapshot,
  getFeaturedAddonsSnapshot,
  getTagsLive,
} from "../../services/addon.service";
import { useContext } from "react";
import { ADDONS_BROWSE_PAGE } from "../../common/constants";
import AuthContext from "../../context/AuthContext";
import { AddonCard } from "../AddonCard/AddonCard";
import Tag from "../Tag/Tag";
import ReactPaginate from "react-paginate";
import ReactHelmet from "../Helmet/ReactHelmet";
import { browseSEO } from "../../common/reactHelmet";

export const BrowseAll = () => {
  const { userData } = useContext(AuthContext);
  const [addons, setAddons] = useState([]);
  const [addonsList, setAddonsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tags, setTags] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [itemsPerPage, setItemsPerPage] = useState(ADDONS_BROWSE_PAGE);

  const [selectedSorting, setSelectedSorting] = useState("addedOn");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIDE, setSelectedIDE] = useState("all");

  useEffect(() => {
    const fetchTags = async () => {
      return await getTagsLive((result) => {
        if (result) {
          setTags(Object.keys(result));
        }
      });
    };

    fetchTags();
  }, []);

  useEffect(() => {
    const fetchAddons = async () => {
      try {
        const resultApproved = await getApprovedAddonsSnapshot();
        const resultFeatured = await getFeaturedAddonsSnapshot();
        setAddons({ ...resultApproved.val(), ...resultFeatured.val() }),
          setAddonsList([
            ...Object.keys(resultApproved.val()),
            ...Object.keys(resultFeatured.val()),
          ]);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
        setIsLoading(false);
      }
    };

    fetchAddons();
  }, [isLoading]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const customSort = (a, b) => {
    if (selectedSorting === "newest") {
      return addons[b].addedOn - addons[a].addedOn;
    } else if (selectedSorting === "oldest") {
      return addons[a].addedOn - addons[b].addedOn;
    } else if (selectedSorting === "mostDownloaded") {
      const downloadsA = addons[a].downloadedBy
        ? Object.keys(addons[a].downloadedBy).length
        : 0;
      const downloadsB = addons[b].downloadedBy
        ? Object.keys(addons[b].downloadedBy).length
        : 0;
      return downloadsB - downloadsA;
    }
  };

  const sortedAddons = addonsList.sort(customSort);

  let filteredAddons;
  if (selectedIDE === "all") {
    filteredAddons = sortedAddons;
  } else {
    filteredAddons = sortedAddons.filter(
      (a) => addons[a].targetIDE === selectedIDE
    );
  }
  const searchedAddons = filteredAddons.filter(
    (a) =>
      addons[a].name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      addons[a].author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      addons[a].targetIDE?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      addons[a].tags?.includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const totalPages = Math.ceil(addonsList.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <>
      <ReactHelmet view={browseSEO} />
      <div className="p-2 md:p-8 grid grid-cols-2 md:grid-cols-6 md:grid-flow-row gap-5">
        <div className="row-span-2 col-span-2 md:col-span-1 space-y-3">
          <span className="flex text-md items-center">
            <i className="bi bi-search absolute text-2xl ml-3" />
            <input
              type="text"
              className="input input-md input-bordered border-2 w-full p-2 pl-10"
              placeholder="Search by name, author ot IDE"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </span>{" "}
          <div className="dropdown mt-2 w-full dropdown-end content-center">
            <label tabIndex={0} className="btn w-full">
              Select IDE<i className="bi bi-chevron-down"></i>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 w-full shadow-lg menu menu-md md:menu-lg dropdown-content dropdown-left bg-base-100 border-2 border-base-300 rounded-box"
            >
              <span
                onClick={() => setSelectedIDE("all")}
                className={
                  selectedIDE === "all"
                    ? "menu-title text-base-content bg-base-200"
                    : "menu-title text-base-content"
                }
              >
                All
              </span>
              <span
                onClick={() => setSelectedIDE("VS Code")}
                className={
                  selectedIDE === "VS Code"
                    ? "menu-title text-base-content bg-base-200"
                    : "menu-title text-base-content"
                }
              >
                VS Code
              </span>
              <li
                onClick={() => setSelectedIDE("IntelliJ IDEA")}
                className={
                  selectedIDE === "IntelliJ IDEA"
                    ? "menu-title text-base-content bg-base-200"
                    : "menu-title text-base-content"
                }
              >
                IntelliJ IDEA
              </li>
              <li
                onClick={() => setSelectedIDE("PyCharm")}
                className={
                  selectedIDE === "PyCharm"
                    ? "menu-title text-base-content bg-base-200"
                    : "menu-title text-base-content"
                }
              >
                Pycharm
              </li>
            </ul>
          </div>
          <div className="dropdown mt-2 w-full dropdown-end content-center">
            <label tabIndex={0} className="btn w-full">
              Sort by<i className="bi bi-chevron-down"></i>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 w-full shadow-lg menu menu-md md:menu-lg dropdown-content dropdown-left bg-base-100 border-2 border-base-300 rounded-box"
            >
              <span
                onClick={() => setSelectedSorting("newest")}
                className={
                  selectedSorting === "newest"
                    ? "menu-title text-base-content bg-base-200"
                    : "menu-title text-base-content"
                }
              >
                Newest
              </span>
              <li
                onClick={() => setSelectedSorting("oldest")}
                className={
                  selectedSorting === "oldest"
                    ? "menu-title text-base-content bg-base-200"
                    : "menu-title text-base-content"
                }
              >
                Oldest
              </li>
              <li
                onClick={() => setSelectedSorting("mostDownloaded")}
                className={
                  selectedSorting === "mostDownloaded"
                    ? "menu-title text-base-content bg-base-200"
                    : "menu-title text-base-content"
                }
              >
                Most Downloaded
              </li>
            </ul>
          </div>
          <div className="divider" />
          <div className="hidden md:block">
            <h5 className="w-full btn btn-ghost text-center ">
              Available tags
            </h5>
            {tags.map((t) => (
              <Tag
                key={t}
                name={t}
                value={t}
                onClick={() => setSearchQuery(t)}
              />
            ))}
          </div>{" "}
        </div>
        {searchedAddons.slice(startIndex, endIndex).map((a) => (
          <>
            {" "}
            <AddonCard
              id={a}
              key={a}
              addon={addons[a]}
              username={userData?.username}
            />
          </>
        ))}
        {totalPages > 1 && (
          <div className="row-span-1 col-span-2 md:col-span-6 md:row-start-3">
            <ReactPaginate
              pageCount={totalPages}
              onPageChange={handlePageChange}
              containerClassName="flex justify-center items-center text-lg gap-1"
              pageLinkClassName="btn rounded-lg btn-secondary"
              previousLabel={<i className="btn bi bi-arrow-left"></i>}
              nextLabel={<i className="btn bi bi-arrow-right"></i>}
              previousClassName="prev"
              nextClassName="next"
              activeClassName="border-2 rounded-lg bg-accent shadow border-accent"
            />
          </div>
        )}
      </div>
    </>
  );
};
