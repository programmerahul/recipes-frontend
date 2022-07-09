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
  renderSortIcon = (column) => {
    const { path, order } = this.props.sortColumn;
    if (path !== column.path) {
      return null;
    }
    if (order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label}
              {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHead;
