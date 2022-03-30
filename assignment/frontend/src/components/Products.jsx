/** @format */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actionCreators/productsActions";
import Product from "./Product";
import ProductAdder from "./ProductAdder";

const Products = () => {
  const dispatch = useDispatch();
  const [adderOpen, setAdderOpen] = useState(false);

  const products = useSelector((state) => state.products);
  const role = useSelector((state) => state.auth).role;
  const isAdmin = role && role === "admin";

  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(getProducts());
    }
  });

  /**
   * Handles clicks of open adder
   * @param {*} e Event
   */
  const openAdderClick = (e) => {
    e.preventDefault();
    setAdderOpen(!adderOpen);
  };

  /**
   * Close adder
   */
  const closeAdder = () => {
    setAdderOpen(false);
  };

  const productList = products.map((val) => (
    <Product providedProduct={val} key={`product-${val.id}`} />
  ));

  return (
    <div data-testid="products-component">
      {isAdmin && (
        <button data-testid="open-adder-button" onClick={openAdderClick}>
          {(adderOpen && "Close") || "Open"}
        </button>
      )}
      {isAdmin && adderOpen && (
        <ProductAdder open={adderOpen} openHandler={closeAdder} />
      )}
      <ul data-testid="products-container">{productList}</ul>
    </div>
  );
};

export default Products;
