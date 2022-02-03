import { useState } from "react";

export const AddPlayer = ({ handleSubmit }) => {
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(false);

  return (
    <div>
      <form onSubmit={(e) => handleSubmit({ name, isActive }, e)}>
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
