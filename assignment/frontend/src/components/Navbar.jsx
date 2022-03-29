/** @format */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../redux/actionCreators/authActions";

const AllLinks = {
  admin: ["Orders", "Users"],
  customer: ["Orders", "Cart"],
  guest: ["Cart", "Login", "Register"],
};

/**
 * @component
 *
 */
const Navbar = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth).role;
  const [links, setLinks] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);

  /**
   * Creates links from list of strings
   * @param {*} list List of links to create
   * @returns That list
   */
  const createLinks = (list) => {
    return list.map((val) => {
      const lowerVal = val.toLowerCase();
      return (
        <Link
          to={`/${lowerVal}`}
          key={`${lowerVal}-link`}
          data-testid={`${lowerVal}-link`}
        >
          {val}
        </Link>
      );
    });
  };

  /**
   * Handle logout click
   * @param {*} e Event
   */
  const logOutClick = (e) => {
    e.preventDefault();
    dispatch(logOut());
  };

  useEffect(() => {
    const links = AllLinks[role] || AllLinks["guest"];
    setLinks(createLinks(links));
    setLoggedIn(role && (role === "customer" || role === "admin"));
  }, [role]);

  return (
    <div data-testid="navbar-component">
      <Link to="/" data-testid="home-link">
        Home
      </Link>
      <Link to="/products" data-testid="products-link">
        Products
      </Link>

      {links}

      {isLoggedIn && (
        <button data-testid="logout-link" onClick={logOutClick}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Navbar;
