/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { removeUser } from "../redux/actionCreators/usersActions";

const User = ({ providedUser }) => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const auth = useSelector((state) => state.auth);

  let user = providedUser;

  if (userId) {
    user = users.find((val) => val.id === userId);
  }

  const { id, name, email, role } = user;
  const canRemove =
    auth && auth.role && auth.role === "admin" && auth.id !== id;

  /**
   * Delete user
   */
  const deleteUser = () => {
    dispatch(removeUser(id));
  };

  /**
   * Navigate to user modift
   */
  const navigateToModify = () => {
    if (userId) {
      navigate("modify");
    } else {
      navigate(`${id}/modify`);
    }
  };

  return (
    <div data-testid="user-component">
      <h3 data-testid="name-heading">{name}</h3>
      {!userId && (
        <Link data-testid="inspect-link" to={`/${id}`}>
          Inspect
        </Link>
      )}
      <p data-testid="email-element">{email}</p>
      <p data-testid="role-element">{role}</p>
      {canRemove && (
        <button data-testid={`modify-button-${id}`} onClick={navigateToModify}>
          Modify
        </button>
      )}
      {canRemove && (
        <button data-testid={`delete-button-${id}`} onClick={deleteUser}>
          Delete
        </button>
      )}
    </div>
  );
};

export default User;
