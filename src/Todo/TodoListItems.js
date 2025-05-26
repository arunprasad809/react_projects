import React from "react";
import SingleTodoListItem from "./SingleTodoListItem";

const TodoListItems = ({
  todoItems,
  handleClick,
  handleChange,
  handleDelete,
  handleEditItem,
  handleSave,
}) => {
  return (
    <ul className="todo-list">
      {todoItems.map((item) => (
        <SingleTodoListItem
          item={item}
          key={item.id}
          handleChange={handleChange}
          handleClick={handleClick}
          handleDelete={handleDelete}
          handleEditItem={handleEditItem}
          handleSave={handleSave}
        />
      ))}
    </ul>
  );
};

export default TodoListItems;
