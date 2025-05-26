import { useEffect, useState } from "react";
import "./Todo.scss";
import TodoListItems from "./TodoListItems";
import DeletedListItems from "./DeletedListItems";
import AddListItem from "./AddListItem";
import SearchItem from "./SearchItem";
import apiRequest from "../apiRequest";

function Todo() {
  const API_URL = "http://localhost:3500";
  const [fetchItemsError, setFetchItemsError] = useState(null);
  const [fetchDItemsError, setFetchDItemsError] = useState(null);
  const [isItemsLoading, setIsItemsLoading] = useState(true);
  const [isDItemsLoading, setIsDItemsLoading] = useState(true);
  const [todoItems, setTodoItems] = useState([]);
  const [deletedItems, setDeletedItems] = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const todo_items = await fetch(`${API_URL}/items`);
        if (!todo_items.ok) throw Error("Data fetch error: items");
        const listItems = await todo_items.json();
        setTodoItems(listItems);
      } catch (err) {
        setFetchItemsError(err.message);
      } finally {
        setIsItemsLoading(false);
      }
    };
    const fetchDItems = async () => {
      try {
        const deleted_items = await fetch(`${API_URL}/deleted_items`);
        if (!deleted_items.ok) throw Error("Data fetch error: deleted_items");
        const deletedListItems = await deleted_items.json();
        setDeletedItems(deletedListItems);
      } catch (err) {
        setFetchDItemsError(err.message);
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
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: updatedItem.checked }),
    };
    const changeURL = `${API_URL}/items/${id}`;
    console.log(`URL: ${changeURL}`);
    const result = await apiRequest(changeURL, updateOptions);
    setFetchItemsError(result);
  };
  const handleDelete = async (id) => {
    const newListItems = todoItems.filter((item) => item.id !== id);
    setTodoItems(newListItems);
    const deletedItem = todoItems.find((item) => item.id === id);
    const newDeletedItems = [...deletedItems, deletedItem];
    setDeletedItems(newDeletedItems);

    // Post the new deleted item to the server
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deletedItem),
    };
    const delResult = await apiRequest(`${API_URL}/deleted_items`, postOptions);
    setFetchDItemsError(delResult);

    const deleteOptions = {
      method: "DELETE",
    };
    const deleteURL = `${API_URL}/items/${id}`;
    const result = await apiRequest(deleteURL, deleteOptions);
    if (result) setFetchItemsError(result);
  };
  const handleEditItem = (id, item) => {
    alert(`id is: ${id} and item is ${item}`);
    const editDiv = document.getElementById(`edit-div${id}`);
    console.log(editDiv);
    editDiv.style.display = "block";
  };
  const handleSave = (id, item) => {
    // alert(`id is: ${id} and item is ${item}`);
    // const editDiv = document.getElementById(`edit-div${id}`);
    // console.log(editDiv);
    // editDiv.style.display = "none";
  };
  const handleRestore = async (id) => {
    const undoItem = deletedItems.find((item) => item.id === id);
    const newTodoItems = [...todoItems, undoItem];
    setTodoItems(newTodoItems);
    const newDeletedItems = deletedItems.filter((item) => item.id !== id);
    setDeletedItems(newDeletedItems);
    localStorage.setItem("todo_list", JSON.stringify(newTodoItems));
    localStorage.setItem("todo_deleted_list", JSON.stringify(newDeletedItems));

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(undoItem),
    };
    const result = await apiRequest(`${API_URL}/items`, postOptions);
    if (result) setFetchItemsError(result);

    const deleteOptions = {
      method: "DELETE",
    };
    const delResult = await apiRequest(
      `${API_URL}/deleted_items/${id}`,
      deleteOptions
    );
    if (delResult) setFetchDItemsError(delResult);
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
      const postOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addedItem),
      };
      const result = await apiRequest(`${API_URL}/items`, postOptions);
      setFetchItemsError(result);
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

      const deleteOptions = {
        method: "DELETE",
      };
      const deleteURL = `${API_URL}/deleted_items/${id}`;
      const result = await apiRequest(deleteURL, deleteOptions);
      if (result) setFetchDItemsError(result);
    } else {
    }
  };
  const [searchItem, setSearchItem] = useState("");
  const restoreAll = async () => {
    const newTodoItems = [...todoItems, ...deletedItems];
    setTodoItems(newTodoItems);
    setDeletedItems([]);

    for (let i = 0; i < deletedItems.length; i++) {
      const postOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deletedItems[i]),
      };
      const result = await apiRequest(`${API_URL}/items`, postOptions);
      if (result) setFetchItemsError(result);

      const deleteOptions = {
        method: "DELETE",
      };
      let id = deletedItems[i].id;
      const deleteURL = `${API_URL}/deleted_items/${id}`;
      const delResult = await apiRequest(deleteURL, deleteOptions);
      if (delResult) setFetchDItemsError(delResult);
    }
  };
  const clearAll = async () => {
    const confirmation = getConfirmation();
    if (confirmation) {
      setDeletedItems([]);

      for (let i = 0; i < deletedItems.length; i++) {
        const deleteOptions = {
          method: "DELETE",
        };
        let id = deletedItems[i].id;
        const deleteURL = `${API_URL}/deleted_items/${id}`;
        const delResult = await apiRequest(deleteURL, deleteOptions);
        if (delResult) setFetchDItemsError(delResult);
      }
    }
  };

  return (
    <div className="container">
      <h1 className="title">Todo List</h1>
      <div className="row">
        <div className="col">
          <div className="line add-item mb-3">
            <AddListItem
              newItem={newItem}
              setNewItem={setNewItem}
              handleAddItem={handleAddItem}
            />
          </div>
        </div>
        <div className="col">
          <div className="search-item">
            <SearchItem searchItem={searchItem} setSearchItem={setSearchItem} />
          </div>
        </div>
      </div>
      <div className="todo">
        <div className="line main-list mb-3">
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
