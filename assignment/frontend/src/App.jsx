/** @format */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import Notification from "./components/Notification";
import Register from "./components/Register";
import User from "./components/User";
import UserModifier from "./components/UserModifier";
import Users from "./components/Users";
import Auth from "./components/Auth";
import Order from "./components/Order";
import Orders from "./components/Orders";
import Products from "./components/Products";
import Product from "./components/Product";
import ProductModifier from "./components/ProductModifier";
import Finder from "./components/Finder";
import { getOrder } from "./redux/actionCreators/ordersActions";
import { getProduct } from "./redux/actionCreators/productsActions";
import { getUser } from "./redux/actionCreators/usersActions";
import { initApp } from "./redux/actionCreators/appActions";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initApp());
  });

  return (
    <div data-testid="app-component">
      <Navbar />
      <Notification />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* All */}
        <Route path="" element={<Auth authRoles={["guest", "customer"]} />}>
          <Route path="products" element={<Products />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Guest & Customer */}
        <Route
          path="/cart"
          element={<Auth authRoles={["guest", "customer"]} />}
        >
          <Route path="" element={<Cart />} />
        </Route>

        {/* Admin & Customer */}
        <Route path="" element={<Auth authRoles={["admin", "customer"]} />}>
          <Route path="orders" element={<Orders />}>
            <Route path=":orderId" element={<Order />} />{" "}
          </Route>
        </Route>

        {/* Guest */}
        <Route path="" element={<Auth authRoles={["guest"]} />}>
          <Route path="register" element={<Register />} />
        </Route>

        {/* Only admin */}
        <Route path="" element={<Auth authRoles={["admin"]} />}>
          <Route path="users" element={<Users />}>
            <Route path=":userId" element={<User />} />
          </Route>
          <Route path="users/:userId/modify" element={<ProductModifier />} />
          <Route
            path="products/:productId/modify"
            element={<ProductModifier />}
          />
        </Route>

        {/* Not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <footer>
        <p>Copyright &copy; 2022</p>
      </footer>
    </div>
  );
};

export default App;
