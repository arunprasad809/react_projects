import React from "react";
import { useState } from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

const Counter = () => {
  const [arunCount, setArunCount] = useState(0);
  const [hariniCount, setHariniCount] = useState(0);
  const [adhiranCount, setAdhiranCount] = useState(0);
  const handleNames = () => {
    const names = ["Arun", "Harini", "Adhiran"];
    let randomNo = Math.floor(Math.random() * names.length);
    if (randomNo === 0) {
      setArunCount(arunCount + 1);
    } else if (randomNo === 1) {
      setHariniCount(hariniCount + 1);
    } else {
      setAdhiranCount(adhiranCount + 1);
    }
    return names[randomNo];
  };
  const [name, setName] = useState(handleNames);
  const [nameCount, setNameCount] = useState(0);
  const newHandleNames = () => {
    setName(handleNames);
    setNameCount(nameCount + 1);
  };
  return (
    <>
      <div className="container">
        <h1 className="title ta-l">Counter Component</h1>
        <div className="row">
          <div className="d-flex ai-center">
            <p className="mb-0 me-3 pt-2">Welcome, {name}</p>
            <Button onClick={() => newHandleNames()} variant="warning">
              Change name
            </Button>
            <Button
              variant={
                nameCount < 5
                  ? "success"
                  : nameCount < 10
                  ? "secondary"
                  : nameCount < 20
                  ? "warning"
                  : "danger"
              }
              className="ms-2"
            >
              No. of times the name changed
              <Badge className="ms-2" bg="dark">
                {nameCount}
              </Badge>
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="d-flex mt-3">
            <p className="mt-2 mb-0">Count of each name:</p>
            <Button
              variant={
                arunCount < 3
                  ? "success"
                  : arunCount < 5
                  ? "secondary"
                  : arunCount < 8
                  ? "warning"
                  : "danger"
              }
              className="ms-2"
            >
              Arun
              <Badge className="ms-2" bg="dark">
                {arunCount}
              </Badge>
            </Button>
            <Button
              variant={
                hariniCount < 3
                  ? "success"
                  : hariniCount < 5
                  ? "secondary"
                  : hariniCount < 8
                  ? "warning"
                  : "danger"
              }
              className="ms-2"
            >
              Harini
              <Badge className="ms-2" bg="dark">
                {hariniCount}
              </Badge>
            </Button>
            <Button
              variant={
                adhiranCount < 3
                  ? "success"
                  : adhiranCount < 5
                  ? "secondary"
                  : adhiranCount < 8
                  ? "warning"
                  : "danger"
              }
              className="ms-2"
            >
              Adhiran
              <Badge className="ms-2" bg="dark">
                {adhiranCount}
              </Badge>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Counter;
