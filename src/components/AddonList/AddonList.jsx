import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  DEFAULT_ITEMS_PER_PAGE,
  stateBadgeColors,
} from "../../common/constants";
import { getAddons } from "../../services/addon.service";
import ReactPaginate from "react-paginate";
import AddonListRow from "./AddonListRow";
import TableHeader from "../Table/TableHeader";
import { addonTableHeaders } from "../../common/tableHeaders";
import { getUserAddons } from "../../services/users.service";
import AuthContext from "../../context/AuthContext";

const AddonList = ({ role, username }) => {
  const { userData } = useContext(AuthContext);
  const [addons, setAddons] = useState([]);
  const [addonsList, setAddonsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);

  const [sortAsc, setSortAsc] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    const fetchAddons = async () => {
      try {
        let result;
        result = await getAddons();
        setAddons(result.val());
        if (role === "user") {
          const userAddonIDs = await getUserAddons(username);
          const intersection = Object.keys(result.val()).filter((id) =>
            userAddonIDs.includes(id)
          );
          setAddonsList(intersection);
        } else {
          setAddonsList(Object.keys(result.val()));
        }
        setIsLoading(false);
      } catch (e) {
        console.error(e);
        setIsLoading(false);
      }
    };

    fetchAddons();
  }, [isLoading, sortAsc]);

  const handleSort = (sortAsc) => {
    setSortAsc(sortAsc);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterToggle = (state) => {
    if (selectedFilters.includes(state)) {
      setSelectedFilters(selectedFilters.filter((filter) => filter !== state));
    } else {
      setSelectedFilters([...selectedFilters, state]);
    }
  };

  const sortedAddons = addonsList.sort((a, b) => {
    return sortAsc
      ? addons[a].addedOn - addons[b].addedOn
      : addons[b].addedOn - addons[a].addedOn;
  });

  const filteredAddons = sortedAddons.filter(
    (a) => !selectedFilters.length || selectedFilters.includes(addons[a].state)
  );

  const searchedAddons = filteredAddons.filter(
    (a) =>
      addons[a].name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      addons[a].author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      addons[a].targetIDE?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const totalPages = Math.ceil(addonsList.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const handleItemsPerPageChange = (e) => {
    if (!e.target.value) {
      setItemsPerPage(DEFAULT_ITEMS_PER_PAGE);
    }
    if (Number(e.target.value)) {
      setItemsPerPage(parseInt(e.target.value));
    }
  };

  return (
    <div className="overflow-x-auto px-3 md:px-10 bg-base-200">
      <table className="table table-lg table-auto ">
        <thead className="border-b-4 border-base-300">
          <tr>
            <td>
              {" "}
              <div className="flex justify-between items-center text-sm md:text-md gap-1">
                <label className="mr-2 row-span-1">
                  Total addons: {addonsList.length}
                </label>
                <div>
                  <label className="mr-2">Addons per page:</label>
                  <input
                    type="text"
                    className="input input-sm p-2 w-12"
                    min="1"
                    onChange={handleItemsPerPageChange}
                  />
                </div>
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-neutral btn-xs">
                    <div>
                      Status <i className="bi bi-chevron-down"></i>
                    </div>
                  </label>
                  <ul className="dropdown-content rounded-md bg-base-300 border border-dotted border-neutral w-auto">
                    {Object.keys(stateBadgeColors).map((state) => (
                      <li key={state} className="flex items-center">
                        <label
                          htmlFor={`checkbox_id_${state}`}
                          className="block p-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            className="checkbox checkbox-sm mr-2"
                            id={`checkbox_id_${state}`}
                            checked={selectedFilters.includes(state)}
                            onChange={() => handleFilterToggle(state)}
                            placeholder={state}
                          />
                          {state}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </td>
            <td> </td>
            <td> </td>
            <td colSpan={2}>
              <span className="flex text-md items-center">
                <i className="bi bi-search absolute text-2xl ml-3" />
                <input
                  type="text"
                  className="input input-md w-full p-2 pl-12"
                  placeholder="Search by addon name, author or target IDE"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </span>
            </td>
          </tr>
          <tr className="border-t-4 border-base-300">
            {addonTableHeaders.map((h) => (
              <TableHeader columnName={h} key={h} onSort={handleSort} />
            ))}
          </tr>
        </thead>
        <tbody>
          {searchedAddons.slice(startIndex, endIndex).map((a) => (
            <AddonListRow
              key={a}
              uid={a}
              addonData={addons[a]}
              reloadParent={() => setIsLoading(!isLoading)}
              role={role}
              loggedUser={userData?.username}
            />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={addonTableHeaders.length}>
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
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

AddonList.propTypes = {
  username: PropTypes.string,
  role: PropTypes.string,
};

AddonList.defaultProps = {
  username: "",
  role: "admin",
};

export default AddonList;
