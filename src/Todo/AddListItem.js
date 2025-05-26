import React from "react";
import { FaPlus } from "react-icons/fa";
import { useRef } from "react";

const AddListItem = ({ newItem, setNewItem, handleAddItem }) => {
  const inputRef = useRef();

  return (
    <form className="input-group mb-3" onSubmit={handleAddItem}>
      <input
        type="text"
        autoFocus
        ref={inputRef}
        id="add-list-item"
        className="form-control"
        placeholder="Enter To-Do item"
        aria-label="Add list item"
        aria-describedby="button-addon2"
        required
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button
        className="btn btn-primary"
        onClick={() => inputRef.current.focus()}
        type="submit"
        id="button-addon2"
      >
        <FaPlus className="icon-space" />
        Add
      </button>
    </form>
  );
};

export default AddListItem;
