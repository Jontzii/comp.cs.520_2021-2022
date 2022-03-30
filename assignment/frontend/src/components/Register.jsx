/** @format */

import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../redux/actionCreators/authActions";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const dispatch = useDispatch();

  /**
   * Registers a new user
   * @param {*} e Event
   */
  const registerUser = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, password, passwordConfirmation }));
  };

  return (
    <div data-testid="register-component">
      <form data-testid="register-form" onSubmit={registerUser}>
        <label>
          Name:
          <input
            data-testid="name-input"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            data-testid="email-input"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            data-testid="password-input"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password confirmation:
          <input
            data-testid="passwordConfirmation-input"
            type="password"
            required
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </label>
        <br />
        <input data-testid="register-button" type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
