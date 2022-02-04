import { useState } from "react";

export const AuthForm = ({ handleSubmit }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const changeForm = (e) => {
    e.preventDefault();
    setIsLogin(!isLogin);
  };

  return (
    <div>
      {(isLogin && <h2>Log In</h2>) || <h2>Register</h2>}
      <form
        id="auth-form"
        onSubmit={(e) => handleSubmit(isLogin, name, password, e)}
      >
        <label>
          Username:
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button type="submit">{(isLogin && "Log In") || "Register"}</button>
        <a href="" onClick={changeForm}>
          {(isLogin && "Register") || "Log In"}
        </a>
      </form>
    </div>
  );
};
