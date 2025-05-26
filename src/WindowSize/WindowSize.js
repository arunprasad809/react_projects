import React from "react";
import Badge from "react-bootstrap/Badge";
import useWindowSize from "../hooks/useWindowSize";

const WindowSize = () => {
  const { width } = useWindowSize();

  return (
    <>
      <div>
        <h1 className="title">Using Custom Hooks</h1>
        <h3>
          Window width is: <Badge bg="success">{width}</Badge>
        </h3>
        <p>
          We have written a{" "}
          <a href="https://github.com/gitdagray/react_context/blob/main/src/hooks/useWindowSize.js">
            custom hook
          </a>{" "}
          to get the width when rezised.
        </p>
      </div>
    </>
  );
};

export default WindowSize;
