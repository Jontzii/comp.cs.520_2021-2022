/** @format COMPONENTS */

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPlayer } from "../redux/actionCreators/playersActions";

export const AddPlayer = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handlePlayerSubmit = (e) => {
    e.preventDefault();

    const action = addPlayer({
      name,
      isActive,
    });

    dispatch(action);

    setName("");
    setIsActive(false);
  };

  return (
    <div>
      <h2>Add player</h2>
      <form onSubmit={handlePlayerSubmit}>
        <label>
          Name:{" "}
          <input
            id="name"
            name="name"
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Is active:{" "}
          <input
            id="active"
            name="active"
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};
