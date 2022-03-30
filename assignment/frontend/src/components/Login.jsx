/** @format */

import { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../redux/actionCreators/authActions";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(logIn({ email, password }));
  };

  return (
    <div data-testid="login-component" onSubmit={onSubmit}>
      <form data-testid="login-form">
        <label>
          Email:
          <input
            data-testid="email-input"
            type="email"
            placeholder="user@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            data-testid="password-input"
            type="password"
            placeholder="password (at least 10 characters"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <br />
        <input data-testid="login-button" type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
