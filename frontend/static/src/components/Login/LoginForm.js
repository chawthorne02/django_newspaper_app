import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";

function LoginForm({ superState, setSuperState }) {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleError = (err) => {
    console.warn(err);
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
    body: JSON.stringify(user),
  };

  const response = await fetch("/dj-rest-auth/login/", options).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK.");
    } else {
      const data = await response.json();
      Cookies.set("Authorization", `Token ${data.key}`);
      navigate("/");
      setSuperState({ ...superState, auth: true, admin: data.is_superuser, authorID: data.id });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          name="username"
          value={user.username}
          onChange={handleInput}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          name="password"
          value={user.password}
          onChange={handleInput}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Login
      </Button>
        <p>No account? Click <Link to={"/register"}>here</Link> to register.</p>
    </Form>
  );
}

export default LoginForm;