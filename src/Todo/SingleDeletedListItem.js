import React from "react";
import { FaRedo, FaTrash } from "react-icons/fa";

const SingleDeletedListItem = ({ item, handleRestore, permanentlyDelete }) => {
  return (
    <li key={item.id}>
      <div className="checkbox-wrapper">
        <input
          type="checkbox"
          className="check"
          checked={item.checked}
          id={`item-${item.id}`}
          disabled
        />
        <label htmlFor={`item-${item.id}`} className="label">
          <svg width="40" height="40" viewBox="0 0 95 95">
            <rect
              x="0"
              y="0"
              width="95"
              height="95"
              stroke="black"
              fill="#eee"
            />
            <g transform="translate(0,-952.36222)">
              <path
                d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4 "
                stroke="#999"
                strokeWidth="5"
                fill="none"
                className="path1"
              />
            </g>
          </svg>
          <span>{item.item}</span>
        </label>
      </div>
      <span
        onClick={() => handleRestore(item.id)}
        role="button"
        tabIndex="0"
        className="btn btn-outline-success inverted"
        title="Restore"
      >
        <FaRedo />
      </span>
      <span
        className="btn btn-outline-danger ms-2"
        title="Permanantly delete?"
        role="button"
        onClick={() => permanentlyDelete(item.id)}
      >
        <FaTrash />
      </span>
    </li>
  );
};

export default SingleDeletedListItem;
