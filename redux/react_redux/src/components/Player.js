/** @format COMPONENTS */

import { useDispatch } from "react-redux";
import { removePlayer } from "../redux/actionCreators/playersActions";

export const Player = ({ name, isActive, id }) => {
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    const action = removePlayer(id);

    dispatch(action);
  };

  return (
    <div>
      <p>
        {name}: {(isActive && "active") || "not active"}
      </p>
      <button className="remove-btn" onClick={() => handleRemove(id)}>
        Remove
      </button>
    </div>
  );
};
