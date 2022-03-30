/** @format */

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/actionCreators/productsActions";

const ProductAdder = ({ open, openHandler }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  /**
   * Adds product to store
   */
  const addProductClick = () => {
    dispatch(addProduct({ price, name, image, description }));
    openHandler();
  };

  if (!open) {
    return null;
  }

  return (
    <form
      data-testid="product-adder-component"
      onSubmit={(e) => e.preventDefault()}
    >
      <label>
        Name:
        <input
          data-testid="name-input"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Price:
        <input
          data-testid="price-input"
          type="text"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      <br />
      <label>
        Image URL:
        <input
          data-testid="image-input"
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </label>
      <br />
      <label>
        Description:
        <input
          data-testid="description-input"
          type="text"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <br />
      <button data-testid="add-button" onClick={addProductClick}>
        Add product
      </button>
      <button data-testid="cancel-button" onClick={() => openHandler()}>
        Cancel
      </button>
    </form>
  );
};

export default ProductAdder;
