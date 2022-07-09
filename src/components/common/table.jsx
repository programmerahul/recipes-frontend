import React from "react";
import TableBody from "./tableBody";
import TableHead from "./tableHead";
const Table = ({ columns, onSort, sortColumn, data }) => {
  return (
    <table className="table">
      <TableHead columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
