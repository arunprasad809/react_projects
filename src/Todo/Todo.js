import { useEffect, useState } from "react";
import "./Todo.scss";
import TodoListItems from "./TodoListItems";
import DeletedListItems from "./DeletedListItems";
import AddListItem from "./AddListItem";
import SearchItem from "./SearchItem";
import api from "../api/data";
import { Row, Col } from "react-bootstrap";

function Todo() {
  const [fetchItemsError, setFetchItemsError] = useState(null);
  const [fetchDItemsError, setFetchDItemsError] = useState(null);
  const [isItemsLoading, setIsItemsLoading] = useState(true);
  const [isDItemsLoading, setIsDItemsLoading] = useState(true);
  const [todoItems, setTodoItems] = useState([]);
  const [deletedItems, setDeletedItems] = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const todo_items = await api.get("/items");
        setTodoItems(todo_items.data);
      } catch (err) {
        if (err.response) {
          setFetchItemsError(
            `${err.response.data}: ${err.response.status}: ${err.response.headers}`
          );
        } else {
          setFetchItemsError(err.message);
        }
      } finally {
        setIsItemsLoading(false);
      }
    };
    const fetchDItems = async () => {
      try {
        const deleted_items = await api.get("/deleted_items");
        setDeletedItems(deleted_items.data);
      } catch (err) {
        if (err.response) {
          setFetchDItemsError(
            `${err.response.data}: ${err.response.status}: ${err.response.headers}`
          );
        } else {
          setFetchDItemsError(err.message);
        }
      } finally {
        setIsDItemsLoading(false);
      }
    };
    setTimeout(() => {
      (async () => await fetchItems())();
    }, 1000);
    setTimeout(() => {
      (async () => await fetchDItems())();
    }, 1000);
  }, []);

  const handleClick = (id) => {
    handleChange(id);
  };
  const handleChange = async (id) => {
    const listItems = todoItems.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setTodoItems(listItems);
    const updatedItem = listItems.find((item) => item.id === id);

    try {
      await api.patch(`/items/${id}`, { checked: updatedItem.checked });
    } catch (err) {
      setFetchItemsError(`While updating, ${err.message}`);
    }
  };
  const handleDelete = async (id) => {
    const newListItems = todoItems.filter((item) => item.id !== id);
    setTodoItems(newListItems);
    const deletedItem = todoItems.find((item) => item.id === id);
    const newDeletedItems = [...deletedItems, deletedItem];
    setDeletedItems(newDeletedItems);

    try {
      await api.post("/deleted_items", deletedItem);
    } catch (err) {
      if (err.response) {
        setFetchDItemsError(
          `Adding deleted item to deleted list, ${err.response.data}: ${err.response.status}: ${err.response.headers}`
        );
      } else {
        setFetchDItemsError(err.message);
      }
    }

    try {
      await api.delete(`/items/${id}`);
    } catch (err) {
      setFetchItemsError(`While deleting item, ${err.message}`);
    }
  };
  const handleEditItem = (id) => {
    alert(`id is: ${id}`);
    const editDiv = document.getElementById(`edit-div${id}`);
    console.log(editDiv);
    editDiv.style.display = "block";
  };
  const handleSave = async (id, item) => {
    alert(`id is: ${id} and item is ${item}`);
    const editDiv = document.getElementById(`edit-div${id}`);
    console.log(editDiv);
    editDiv.style.display = "none";

    try {
      const response = await api.patch(`/items/${id}`, {
        item: item,
        checked: false,
      });
      setTodoItems(
        todoItems.map((item) => (item.id === id ? { ...response.data } : item))
      );
    } catch (err) {
      setFetchItemsError(`While Saving, ${err.message}`);
    }
  };
  const handleRestore = async (id) => {
    const undoItem = deletedItems.find((item) => item.id === id);
    const newTodoItems = [...todoItems, undoItem];
    setTodoItems(newTodoItems);
    const newDeletedItems = deletedItems.filter((item) => item.id !== id);
    setDeletedItems(newDeletedItems);
    localStorage.setItem("todo_list", JSON.stringify(newTodoItems));
    localStorage.setItem("todo_deleted_list", JSON.stringify(newDeletedItems));

    try {
      await api.post("/items", undoItem);
    } catch (err) {
      setFetchItemsError(`While adding restore item, ${err.message}`);
    }

    try {
      await api.delete(`/deleted_items/${id}`);
    } catch (err) {
      setFetchDItemsError(`While removing restore item, ${err.message}`);
    }
  };
  const [newItem, setNewItem] = useState("");
  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newItem) return;
    console.log(newItem);
    const existingItem = todoItems.filter((item) => item.item === newItem);
    if (existingItem.length > 0) {
      alert("To-Do item already exists!");
    } else {
      setNewItem("");
      const arrayItems = [...todoItems, ...deletedItems];
      const allIds = arrayItems.map((item) => {
        return item.id;
      });
      let highestID = 0;
      for (let i = 0; i < allIds.length; i++) {
        highestID = highestID > allIds[i] ? highestID : allIds[i];
      }
      console.log(highestID);
      const addedItem = {
        id: (Number(highestID) + 1).toString(),
        item: newItem,
        checked: false,
      };
      const newTodoItems = [...todoItems, addedItem];
      setTodoItems(newTodoItems);

      // Post the new item to the server
      try {
        await api.post("/items", addedItem);
      } catch (err) {
        setFetchItemsError(`While adding item ${err.message}`);
      }
    }
  };
  const getConfirmation = () => {
    return window.confirm("Are you sure? This cannot be restored!");
  };
  const permanentlyDelete = async (id) => {
    const confirmation = getConfirmation();
    if (confirmation) {
      const newDeletedList = deletedItems.filter((item) => item.id !== id);
      setDeletedItems(newDeletedList);

      try {
        await api.delete(`/deleted_items/${id}`);
      } catch (err) {
        setFetchDItemsError(`While permanently deleting, ${err.message}`);
      }
    } else {
    }
  };
  const [searchItem, setSearchItem] = useState("");
  const restoreAll = async () => {
    const newTodoItems = [...todoItems, ...deletedItems];
    setTodoItems(newTodoItems);
    setDeletedItems([]);

    for (let i = 0; i < deletedItems.length; i++) {
      try {
        await api.post("/items", deletedItems[i]);
      } catch (err) {
        setFetchItemsError(
          `While adding - restore all (${i} item), ${err.message}`
        );
      }
      let id = deletedItems[i].id;
      try {
        await api.delete(`/deleted_items/${id}`);
      } catch (err) {
        setFetchItemsError(
          `While removing - restore all (${i} item), ${err.message}`
        );
      }
    }
  };
  const clearAll = async () => {
    const confirmation = getConfirmation();
    if (confirmation) {
      setDeletedItems([]);

      for (let i = 0; i < deletedItems.length; i++) {
        let id = deletedItems[i].id;
        try {
          await api.delete(`deleted_items/${id}`);
        } catch (err) {
          setFetchDItemsError(`While Clearing all, ${err.message}`);
        }
      }
    }
  };

  return (
    <div className="container">
      <h1 className="title">Todo List</h1>
      <Row>
        <Col md>
          <div className="line add-item">
            <AddListItem
              newItem={newItem}
              setNewItem={setNewItem}
              handleAddItem={handleAddItem}
            />
          </div>
        </Col>
        <Col md>
          <div className="search-item">
            <SearchItem searchItem={searchItem} setSearchItem={setSearchItem} />
          </div>
        </Col>
      </Row>
      <div className="todo">
        <div className="line main-list mt-3 mb-3">
          <h4>To-Do List:</h4>
          {isItemsLoading && <p>Fetching To-Do items...</p>}
          {fetchItemsError && <p>{`Error: ${fetchItemsError}`}</p>}
          {!isItemsLoading &&
            !fetchItemsError &&
            (todoItems.length > 0 ? (
              <TodoListItems
                todoItems={todoItems.filter((item) =>
                  item.item.toLowerCase().includes(searchItem.toLowerCase())
                )}
                handleClick={handleClick}
                handleChange={handleChange}
                handleDelete={handleDelete}
                handleEditItem={handleEditItem}
                handleSave={handleSave}
              />
            ) : (
              <p>
                <i>There is no item in the list</i>
              </p>
            ))}
        </div>
        {isDItemsLoading && <p>Fetching Deleted items...</p>}
        {fetchDItemsError && <p>{`Error: ${fetchDItemsError}`}</p>}
        {!isDItemsLoading &&
          !fetchDItemsError &&
          (deletedItems.length > 0 ? (
            <div className="line deleted-list" style={{ marginTop: "20px" }}>
              <h4>
                Deleted List:
                <span
                  className="greenColor"
                  role="button"
                  onClick={() => restoreAll()}
                >
                  Restore all
                </span>
                <span
                  className="redColor"
                  role="button"
                  onClick={() => clearAll()}
                >
                  Clear all
                </span>
              </h4>
              <DeletedListItems
                deletedItems={deletedItems.filter((item) =>
                  item.item.toLowerCase().includes(searchItem.toLowerCase())
                )}
                handleRestore={handleRestore}
                permanentlyDelete={permanentlyDelete}
              />
            </div>
          ) : (
            ""
          ))}
      </div>
    </div>
  );
}
export default Todo;
