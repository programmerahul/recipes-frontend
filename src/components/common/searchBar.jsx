import React, { Component } from "react";
class SearchBar extends Component {
  render() {
    return (
      <div style={{ marginBottom: 20 }} className="form-outline">
        <input
          onChange={(e) => this.props.onChange(e.currentTarget.value)}
          value={this.props.value}
          type="search"
          id="form1"
          className="form-control"
          placeholder="Search..."
          aria-label="Search"
        />
      </div>
    );
  }
}

export default SearchBar;
