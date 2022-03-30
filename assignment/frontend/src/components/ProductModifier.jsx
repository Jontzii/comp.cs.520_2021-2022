/** @format */

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateProduct } from "../redux/actionCreators/productsActions";
import { useNavigate, useParams } from "react-router-dom";

const ProductModifier = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productId } = useParams();
  const products = useSelector((state) => state.products);
  const product = products.find((val) => val.id === productId);

  const { id, name, price, image, description } = product;

  const [nameNew, setName] = useState(name);
  const [priceNew, setPrice] = useState(price);
  const [imageNew, setImage] = useState(image);
  const [descriptionNew, setDescription] = useState(description);

  /**
   * Modify product
   * @param {*} e Event
   */
  const modifyOnSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        id,
        name: nameNew,
        price: priceNew,
        image: imageNew,
        description: descriptionNew,
      })
    );
    navigate("/products");
  };

  /**
   * Cancel modifying
   * @param {*} e Event
   */
  const cancelClick = (e) => {
    e.preventDefault();
    navigate("/products");
  };

  return (
    <form data-testid="product-modifier-component" onSubmit={modifyOnSubmit}>
      <label>
        Id:
        <input
          data-testid="id-input"
          type="text"
          required
          disabled
          value={id}
        />
      </label>
      <label>
        Name:
        <input
          data-testid="name-input"
          type="text"
          required
          value={nameNew}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Price:
        <input
          data-testid="price-input"
          type="text"
          required
          value={priceNew}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      <label>
        Image URL:
        <input
          data-testid="image-input"
          type="text"
          value={imageNew}
          onChange={(e) => setImage(e.target.value)}
        />
      </label>
      <label>
        Description:
        <input
          data-testid="description-input"
          type="text"
          required
          value={descriptionNew}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <button data-testid="update-button" type="submit">
        Update
      </button>
      <button data-testid="cancel-button" onClick={cancelClick}>
        Cancel
      </button>
    </form>
  );
};

export default ProductModifier;
