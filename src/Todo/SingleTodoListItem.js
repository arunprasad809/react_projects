import { FaTrash, FaEdit, FaRegSave } from "react-icons/fa";
import { useRef, useState } from "react";

const SingleTodoListItem = ({
  item,
  handleChange,
  handleDelete,
  handleEditItem,
  handleSave,
}) => {
  const editRef = useRef();
  const [editValue, setEditValue] = useState(item.item);

  return (
    <li key={item.id}>
      <div className="checkbox-wrapper">
        <input
          type="checkbox"
          className="check"
          onChange={() => handleChange(item.id)}
          checked={item.checked}
          id={`item-${item.id}`}
        />
        <label
          htmlFor={`item-${item.id}`}
          className="label"
          onDoubleClick={() => alert("testing")}
        >
          <svg width="40" height="40" viewBox="0 0 95 95">
            <rect
              x="0"
              y="0"
              width="95"
              height="95"
              stroke="black"
              fill="#fff"
            />
            <g transform="translate(0,-952.36222)">
              <path
                d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4 "
                stroke="#1a8754"
                strokeWidth="5"
                fill="none"
                className="path1"
              />
            </g>
          </svg>
          <span>{item.item}</span>
        </label>
      </div>
      <form
        className="edit-div"
        id={`edit-div${item.id}`}
        style={{ display: "none" }}
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(item.id, editValue);
        }}
      >
        <input
          type="text"
          className="form-control edit-inputbox"
          name="edit-item"
          value={editValue}
          ref={editRef}
          onChange={(e) => setEditValue(e.target.value)}
        />
        <button
          className="btn btn-outline-success"
          type="submit"
          title="Save To-do"
        >
          <FaRegSave />
        </button>
      </form>
      <span
        onClick={() => {
          handleEditItem(item.id);
          editRef.current.focus();
        }}
        role="button"
        tabIndex="0"
        className="btn btn-outline-success"
        title="Edit To-do"
      >
        <FaEdit />
      </span>
      <span
        onClick={() => handleDelete(item.id)}
        role="button"
        tabIndex="0"
        className="btn btn-outline-danger ms-2"
        title="Delete"
      >
        <FaTrash />
      </span>
    </li>
  );
};

export default SingleTodoListItem;
