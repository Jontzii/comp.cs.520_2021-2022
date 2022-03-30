/** @format */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../redux/actionCreators/ordersActions";
import Order from "./Order";

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  useEffect(() => {
    if (!orders || orders.length === 0) {
      dispatch(getOrders());
    }
  }, [orders, dispatch]);

  if (!orders || orders.length === 0) {
    return <div data-testid="no-order-component"></div>;
  }

  const orderList = orders.map((val) => {
    return (
      <Order
        providedOrder={{
          id: val.id,
          customerId: val.customerId,
          items: val.items,
        }}
        data-testid="order-component"
        key={`order-component-${val.id}`}
      />
    );
  });

  return (
    <div data-testid="orders-component">
      <ul data-testid="orders-container">{orderList}</ul>
    </div>
  );
};

export default Orders;
