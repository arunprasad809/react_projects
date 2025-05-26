import React, { useReducer } from "react";
import { Button } from "react-bootstrap";

const Reducer = () => {
  const initialState = { count: 0 };

  function reducer(state, action) {
    switch (action.type) {
      case "increment":
        return { count: state.count + 1 };
      case "decrement":
        return { count: state.count - 1 };
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const increment = () => {
    dispatch({ type: "increment" });
  };

  const decrement = () => {
    dispatch({ type: "decrement" });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="title">UseReducer() component</h1>
            <h1 className="title">Count: {state.count}</h1>
            <Button onClick={decrement} className="mr-2" variant="danger">
              Decrement
            </Button>
            <Button onClick={increment} variant="success">
              Increment
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reducer;
