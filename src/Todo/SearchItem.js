import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchItem = ({ searchItem, setSearchItem }) => {
  return (
    <div className="input-group mb-3">
      <label className="input-group-text" htmlFor="search-bar">
        <FaSearch />
      </label>
      <input
        type="text"
        id="search-bar"
        className="form-control"
        placeholder="Search items"
        aria-label="Search items"
        aria-describedby="basic-addon1"
        onChange={(e) => setSearchItem(e.target.value)}
        value={searchItem}
        onFocus={(e) => e.target.parentElement.classList.add("focused")}
        onBlur={(e) => e.target.parentElement.classList.remove("focused")}
      />
    </div>
  );
};

export default SearchItem;
