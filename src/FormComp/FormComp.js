import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import "./FormComp.scss";

const FormComp = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    emailAddress: "",
    password: "",
  });
  const handleChange = (e) => {
    setUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    console.log(user);
  };
  const handleSave = () => {
    console.log("handleSave Start");
    console.log(user);
    console.log("handleSave End");
  };
  return (
    <>
      <div className="container form-comp">
        <div className="row justify-content-md-center">
          <Col xs md="8" lg="6">
            <h1 className="title">Form Component</h1>
            <Form onSubmit={(e) => e.preventDefault()}>
              <Form.Group className="input-group mb-3">
                <Form.Label htmlFor="firstName">First name</Form.Label>
                <Form.Control
                  type="text"
                  id="firstName"
                  name="firstName"
                  autoComplete="on"
                  placeholder="Enter first name"
                  onChange={(e) => handleChange(e)}
                  required
                />
              </Form.Group>
              <Form.Group className="input-group mb-3">
                <Form.Label htmlFor="lastName">Last name</Form.Label>
                <Form.Control
                  type="text"
                  id="lastName"
                  name="lastName"
                  autoComplete="on"
                  placeholder="Enter last name"
                  onChange={(e) => handleChange(e)}
                  required
                />
              </Form.Group>
              <Form.Group className="input-group mb-3">
                <Form.Label htmlFor="userName">Username</Form.Label>
                <Form.Control
                  type="text"
                  id="userName"
                  name="userName"
                  autoComplete="on"
                  placeholder="Enter username"
                  onChange={(e) => handleChange(e)}
                  required
                />
              </Form.Group>

              <Form.Group className="input-group mb-3">
                <Form.Label htmlFor="emailAddress">Email address</Form.Label>
                <Form.Control
                  type="email"
                  id="emailAddress"
                  name="emailAddress"
                  autoComplete="on"
                  placeholder="Enter email"
                  onChange={(e) => handleChange(e)}
                  required
                />
              </Form.Group>

              <Form.Group className="input-group mb-3">
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="off"
                  placeholder="Password"
                  onChange={(e) => handleChange(e)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" onClick={handleSave}>
                Submit
              </Button>
            </Form>
          </Col>
        </div>
      </div>
    </>
  );
};

export default FormComp;
