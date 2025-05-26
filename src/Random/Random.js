import React from "react";
import { useState } from "react";
var toHex = require("colornames");

function Random() {
  // The below is for random Name selection onClick
  const [name, setName] = useState("Arun");
  const randomName = () => {
    const names = [
      "Arun",
      "Anand",
      "Bharath",
      "Deena",
      "Dinesh",
      "Priyanka",
      "Ramya",
      "Swetha",
      "Seven",
      "Tharun",
      "Yogitha",
    ];
    const randonNum = Math.floor(Math.random() * names.length);
    console.log(names[randonNum]);
    setName(names[randonNum]);
  };

  // The below is for Count increment and decrement onclick
  const [count, setCount] = useState(5);
  const decreaseCount = () => {
    if (count > 0) {
      setCount(count - 1);
      updateStringNumber(count - 1);
    }
    if (count === 0) {
      alert(`Reached min value, ${count}`);
    }
  };
  const increaseCount = () => {
    if (count < 10) {
      setCount((count) => {
        return count + 1;
      });
      updateStringNumber(count + 1);
    }
    if (count === 10) {
      alert(`Reached max value, ${count}`);
    }
  };

  // The below displays the chosen number as string
  const numbers = [
    "Zero",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
  ];
  const [stringNumber, setStringNumber] = useState(numbers[count]);
  const updateStringNumber = (numbr) => {
    setStringNumber(numbers[numbr]);
  };

  // Project Exercise
  const [bgColor, setBgColor] = useState("Black");
  const [hexCode, setHexCode] = useState("#000000");
  const handleToggle = (e) => {
    const box = document.querySelector(".big-box");
    box.classList.toggle("black");
    box.classList.toggle("white");
  };

  return (
    <div className="container">
      <div className="row">
        <h1 className="title">Random projects</h1>
        <div className="col">
          <p className="test test2">This is Arun's first React App</p>
          <button className="btn btn-primary" onClick={increaseCount}>
            +
          </button>
          <p className="mt-2 mb-2">{count}</p>
          <button className="btn btn-primary" onClick={decreaseCount}>
            -
          </button>
          <div className="string-number">
            <p>The string number is: {stringNumber}</p>
          </div>
          <div className="random-name">
            <p>The random name is: {name}</p>
            <button className="btn btn-success" onClick={randomName}>
              Click to change name
            </button>
          </div>
        </div>
        <div className="col">
          <div className="projExercise">
            <div className="big-box white" style={{ backgroundColor: bgColor }}>
              <p className="mt-3">
                BG color is:{" "}
                <span style={{ textTransform: "capitalize" }}>{bgColor}</span>
              </p>
              <p>Color code: {hexCode}</p>
            </div>
            <input
              type="text"
              id="color-name"
              className="form-control color-name"
              placeholder="Enter color name"
              value={bgColor}
              onChange={(e) => {
                setBgColor(e.target.value);
                setHexCode(toHex(e.target.value));
              }}
            />
            <button
              onClick={(e) => handleToggle(e)}
              className="btn btn-secondary"
            >
              Toggle text color
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Random;
