/** @format */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/actionCreators/usersActions";
import User from "./User";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    if (!users || users.length === 0) {
      dispatch(getUsers());
    }
  });

  const userList = users.map((val) => (
    <User providedUser={val} key={`user-${val.id}`} />
  ));

  return (
    <div data-testid="users-component">
      <ul data-testid="users-container">{userList}</ul>
    </div>
  );
};

export default Users;
