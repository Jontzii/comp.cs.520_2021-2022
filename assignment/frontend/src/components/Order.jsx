/** @format */

import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const Order = ({ providedOrder }) => {
  const { orderId } = useParams();
  const orders = useSelector((state) => state.orders);

  let order = providedOrder;

  if (orderId) {
    order = orders.find((val) => val.id === orderId);
  }

  const { id, customerId, items } = order;

  const orderList = items.map(({ product, quantity }) => {
    return (
      <li data-testid="order-listitem" key={`listitem-${product.id}`}>
        <h3 data-testid="name-heading">{product.name}</h3>
        <p data-testid="price-element">{product.price}</p>
        <p data-testid="description-element">{product.description}</p>
        <p data-testid="quantity-element">{quantity}</p>
      </li>
    );
  });

  return (
    <div data-testid="order-component">
      <h3 data-testid="orderId-heading">{id}</h3>
      <h3 data-testid="customerId-heading">{customerId}</h3>
      {!orderId && (
        <Link data-testid="inspect-link" to={`${id}`}>
          Inspect
        </Link>
      )}
      <ol data-testid="order-list">{orderList}</ol>
    </div>
  );
};

export default Order;
