/** @format */

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/actionCreators/usersActions";
import { useNavigate, useParams } from "react-router-dom";

const UserModifier = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();

  const users = useSelector((state) => state.users);
  const user = users.find((val) => val.id === userId);
  const { id, name, role } = user;

  const [newRole, setNewRole] = useState(role);

  /**
   * Handles submit of user modifying
   * @param {*} e Event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id, name, newRole }));
    navigate("/users");
  };

  return (
    <form
      data-testid="user-modifier-component"
      onSubmit={(e) => e.preventDefault()}
    >
      <h3 data-testid="name-heading">{name}</h3>
      <select
        data-testid="role-select"
        value={newRole}
        onChange={(e) => setNewRole(e.target.value)}
      >
        <option value="customer">customer</option>
        <option value="admin">admin</option>
      </select>
      <button
        data-testid="update-button"
        type="submit"
        disabled={newRole === role}
        onClick={handleSubmit}
      >
        Update
      </button>
    </form>
  );
};

export default UserModifier;
