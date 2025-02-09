import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

const Login = ({ setIsLoggedIn, setId, setAdmin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // will add login functionality after API route is created

  const handleLogin = async (event) => {
    event.preventDefault();
    const loginObject = { email, password };
    try {
      const response = await fetch(
        "https://anime-e-commerce-6b23vf4cd-brad434s-projects.vercel.app/auth/login/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginObject),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("DATA", data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("id", data.id);
        localStorage.setItem("admin", data.admin);
        setIsLoggedIn(true);
        console.log("ADMIN", data.admin);
        alert("Successfully Logged in");
        setEmail("");
        setPassword("");
        navigate(`/account/${data.id}`);
      } else {
        console.error("Error logging in");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Col className="header_title">
        <h1>Login</h1>
      </Col>
      <Form onSubmit={handleLogin} className="formParent">
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3"
        >
          <Form.Control
            type="email"
            placeholder="name@example.com"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingPassword"
          label="Password"
          className="mb-3"
        >
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </FloatingLabel>
        <Button type="submit" variant="dark" onSubmit={handleLogin}>
          Login
        </Button>
      </Form>
    </>
  );
};

export default Login;
