/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addCartItem,
  incrementCartItem,
} from "../redux/actionCreators/cartActions";
import { deleteProduct } from "../redux/actionCreators/productsActions";

/**
 * @component
 */
const Product = ({ providedProduct }) => {
  const navigate = useNavigate();
  const { productId } = useParams();

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const role = useSelector((state) => state.auth).role;
  const isAdmin = role && role === "admin";

  let product = providedProduct;

  if (productId) {
    product = products.find((val) => val.id === productId);
  }

  const { id, name, price, description } = product;
  const image = product.image;

  /**
   * Adds the product to cart if not in it yet
   * Increments amount by 1 if in cart
   */
  const addToCartClick = () => {
    const productInCart = cart.find((val) => val.product.id === id);

    if (productInCart) {
      dispatch(incrementCartItem(id));
    } else {
      dispatch(addCartItem({ product, quantity: 1 }));
    }
  };

  /**
   * Navigate to modify
   */
  const navigateToModify = () => {
    if (productId) {
      navigate("modify");
    } else {
      navigate(`${id}/modify`);
    }
  };

  return (
    <div data-testid="product-component">
      <h3 data-testid="name-header">{name}</h3>
      {image && <img src={image} alt="product" />}
      <p data-testid="description-element">{description}</p>
      <p data-testid="price-element">{price}</p>
      {isAdmin && (
        <button
          data-testid={`delete-button-${id}`}
          onClick={() => dispatch(deleteProduct(id))}
        >
          Delete
        </button>
      )}
      {isAdmin && (
        <button data-testid={`modify-button-${id}`} onClick={navigateToModify}>
          Modify
        </button>
      )}
      {!isAdmin && (
        <button data-testid={`add-cart-button-${id}`} onClick={addToCartClick}>
          Add to cart
        </button>
      )}
    </div>
  );
};

export default Product;
