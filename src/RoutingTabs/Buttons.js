import React from "react";
import { Button, Form } from "react-bootstrap";

const Buttons = ({ request, setRequest }) => {
  return (
    <>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Button
          variant="dark"
          size="md"
          name="users"
          className={request === "users" ? "active" : null}
          onClick={(e) => setRequest(e.target.name)}
        >
          Users
        </Button>
        <Button
          variant="dark"
          size="md"
          name="posts"
          className={request === "posts" ? "active" : null}
          onClick={(e) => setRequest(e.target.name)}
        >
          Posts
        </Button>
        <Button
          variant="dark"
          size="md"
          name="comments"
          className={request === "comments" ? "active" : null}
          onClick={(e) => setRequest(e.target.name)}
        >
          Comments
        </Button>
      </Form>
    </>
  );
};

export default Buttons;
