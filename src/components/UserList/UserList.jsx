import { useContext, useEffect, useState } from "react";
import { getAllUsers } from "../../services/users.service";
import UserListRow from "../UserList/UserListRow";
import {
  DEFAULT_ITEMS_PER_PAGE,
  roleBadgeColors,
} from "../../common/constants";
import ReactPaginate from "react-paginate";
import TableHeader from "../Table/TableHeader";
import { userTableHeaders } from "../../common/tableHeaders";
import AuthContext from "../../context/AuthContext";

const UserList = () => {
  const { userData } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [usernamesList, setUsernamesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await getAllUsers();
        setUsers(result.val());
        setUsernamesList(Object.keys(result.val()));
        setIsLoading(false);
      } catch (e) {
        console.error(e);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [isLoading]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterToggle = (role) => {
    if (selectedFilters.includes(role)) {
      setSelectedFilters(selectedFilters.filter((filter) => filter !== role));
    } else {
      setSelectedFilters([...selectedFilters, role]);
    }
  };

  const filteredUsers = usernamesList.filter(
    (u) => !selectedFilters.length || selectedFilters.includes(users[u].role)
  );

  const searchedUsers = filteredUsers.filter(
    (u) =>
      u.toLowerCase().includes(searchQuery.toLowerCase()) ||
      users[u].email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      users[u].phone.includes(searchQuery)
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const totalPages = Math.ceil(usernamesList.length / itemsPerPage);

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
                  Total users: {usernamesList.length}
                </label>
                <div>
                  <label className="mr-2">Users per page:</label>
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
                      Role <i className="bi bi-chevron-down"></i>
                    </div>
                  </label>
                  <ul className="dropdown-content rounded-md bg-base-300 border border-dotted border-neutral w-auto">
                    {Object.keys(roleBadgeColors).map((role) => (
                      <li key={role} className="flex items-center">
                        <label
                          htmlFor={`checkbox_id_${role}`}
                          className="block p-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            className="checkbox checkbox-sm mr-2"
                            id={`checkbox_id_${role}`}
                            checked={selectedFilters.includes(role)}
                            onChange={() => handleFilterToggle(role)}
                            placeholder={role}
                          />
                          {role}
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
                  placeholder="Search by username, email or phone"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </span>
            </td>
          </tr>
          <tr className="border-t-4 border-base-300">
            {userTableHeaders.map((h) => (
              <TableHeader columnName={h} key={h} />
            ))}
          </tr>
        </thead>
        <tbody>
          {searchedUsers.slice(startIndex, endIndex).map((u) => (
            <UserListRow
              key={users[u].username}
              userData={users[u]}
              reloadParent={() => setIsLoading(!isLoading)}
              loggedUser={userData?.username}
            />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={userTableHeaders.length}>
              <ReactPaginate
                pageCount={totalPages}
                onPageChange={handlePageChange}
                containerClassName="flex justify-center items-center text-lg gap-1"
                pageLinkClassName="btn rounded-lg btn-primary"
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

export default UserList;
