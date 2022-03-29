/** @format */

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Outlet } from "react-router-dom";

/**
 * A resuable higher-order-component that checks the user has the required role in order to access the given route
 * @param {Array} authRoles An array of roles that are authorized to access this path
 * @returns Child when authorized, null otherwise
 */
const Auth = ({ authRoles }) => {
  const role = useSelector((state) => state.auth).role;
  const [isAuthrorized, setAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!role | (role === "guest") && !authRoles.includes("guest")) {
      setAuthorized(false);
      navigate("/login");
    } else if (role && !authRoles.includes(role)) {
      setAuthorized(false);
      navigate("/");
    } else if (role && authRoles.includes(role)) {
      setAuthorized(true);
    }
  }, [role, authRoles, navigate]);

  if (isAuthrorized) {
    return (
      <div data-testid="auth-success-component">
        <Outlet />
      </div>
    );
  }

  return null;
};

export default Auth;
