import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { cartActions } from "../../store/actions";
import { Button } from "../button/button";
import { addItemToCartServer } from "../../store/actions/cart-async";

const ProductContainer = ({ className, product }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      dispatch(cartActions.addToCart(product, 1));

      await dispatch(addItemToCartServer(product.id, 1));

      console.log("Товар в коризне на сервере");
    } catch (error) {
      console.log("Ошибка добавления в коризну на сервер", error.message);
    }
  };

  return (
    <article className={className}>
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image">
          {product.imageUrl && product.imageUrl.trim() !== "" ? (
            <img src={product.imageUrl} alt={product.title} loading="lazy" />
          ) : (
            <div>Нет изображения</div>
          )}
        </div>
        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
          <div className="product-info__wrapper">
            <div className="product-description">{product.description}</div>
            <div className="product-details">
              {product.inStock ? (
                <div className="product-quantity">
                  В наличии {product.quantity} шт
                </div>
              ) : (
                <div className="product-quantity">Нет в наличии</div>
              )}
            </div>
            <div className="product-price">{product.price} ₽</div>
          </div>
        </div>
      </Link>

      <Button
        className="addCardBtn"
        onClick={handleAddToCart}
        disabled={!product.inStock}
      >
        {!user
          ? "Авторизуйтесь"
          : product.inStock
          ? "Добавить в корзину"
          : "Нет в наличии"}
      </Button>

      {/* <div>{quantity}</div> */}
    </article>
  );
};

export const Product = styled(ProductContainer)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid #000;
  border-radius: 5px;
  padding: 25px;
  width: 800px;
  transition: transform 0.2s;
  height: 300px;

  .product-link {
    display: flex;
    gap: 30px;
    text-decoration: none;
    color: var(--color-black);
    align-items: center;
  }

  .product-description {
    width: 100%;
    height: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .product-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;

    &__wrapper {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }
  }

  &hover: {
    background-color: black;
  }

  .product-image {
    flex-shrink: 0;
    width: 120px;
    height: 120px;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
