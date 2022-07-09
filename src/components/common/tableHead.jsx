import React, { Component } from "react";
class TableHead extends Component {
  raiseSort = (path) => {
    let order = "asc";
    if (this.props.sortColumn.path === path) {
      if (this.props.sortColumn.order === "asc") {
        order = "desc";
      }
    }
    this.props.onSort({ path, order });
  };
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHead;
