import React from "react";
import SingleDeletedListItem from "./SingleDeletedListItem";

const DeletedListItems = ({
  deletedItems,
  handleRestore,
  permanentlyDelete,
}) => {
  return (
    <ul className="todo-list">
      {deletedItems.map((item) => (
        <SingleDeletedListItem
          item={item}
          key={item.id}
          handleRestore={handleRestore}
          permanentlyDelete={permanentlyDelete}
        />
      ))}
    </ul>
  );
};

export default DeletedListItems;
