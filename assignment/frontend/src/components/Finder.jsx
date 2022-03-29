/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";

/**
 * Finds a single item based on the prop type and the id of the item
 * @param {*} param0
 */
const Finder = ({ type, findHandler }) => {
  const [itemFound, setFound] = useState(false);
  const { productId, orderId, userId } = useParams();

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const orders = useSelector((state) => state.orders);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    switch (type) {
      case "product":
        setFound(products.some((val) => val.id === productId));
        break;

      case "order":
        setFound(orders.some((val) => val.id === orderId));
        break;

      case "user":
        setFound(users.some((val) => val.id === userId));
        break;

      default:
        break;
    }
  }, [type, productId, orderId, userId, orders, products, users]);

  if (!itemFound) {
    dispatch(findHandler());
    return (
      <div data-testid={`no-${type}-found-component`}>{type} not found.</div>
    );
  }

  return (
    <div data-testid={`${type}-found-component`}>
      <Outlet />
    </div>
  );
};

export default Finder;
