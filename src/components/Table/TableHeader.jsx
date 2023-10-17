import PropTypes from "prop-types";
import { useState } from "react";

const TableHeader = ({ columnName, onSort }) => {
  const [sortAsc, setSortAsc] = useState(false);
  const handleSort = () => {
    setSortAsc(!sortAsc);
    onSort(sortAsc);
  };

  if (columnName === "Personal info") {
    return (
      <th className="hidden md:table-cell text-center text-lg">{columnName}</th>
    );
  }
  if (columnName === "Created on") {
    return (
      <th
        className="md:table-cell text-center text-lg"
        onClick={handleSort}
      >
        {columnName}{" "}
        {sortAsc ? (
          <i className="bi bi-caret-up-fill" />
        ) : (
          <i className="bi bi-caret-down-fill" />
        )}
      </th>
    );
  }
  return <th className="text-center text-lg">{columnName}</th>;
};

TableHeader.propTypes = {
  columnName: PropTypes.string,
  onSort: PropTypes.func,
};



export default TableHeader;
