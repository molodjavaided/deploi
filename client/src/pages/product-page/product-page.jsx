import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { request } from "../../utils/request";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/actions";
import { Button } from "../../components";

const ProductPageContainer = ({ className }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        setIsLoading(true);
        const response = await request(`/product/${productId}`);
        setProduct(response.product);
        setError(null);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      getProduct();
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(cartActions.addToCart(product, 1));
      console.log("Добавлен в корзину", product);
    }
  };

  if (isLoading) {
    return <div className={className}>Загрузка товара...</div>;
  }

  if (error) {
    return <div className={className}>{error}</div>;
  }

  return (
    <div className={className}>
      <div className="product">
        <div className="product-image">
          <img src={product.imageUrl} alt={product.title} />
        </div>

        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
          <div className="product-description">{product.description}</div>

          <div className="product-quantity">{product.quantity} шт</div>
        </div>
      </div>

      <div className="product-info__price">
        <div className="product-price">{product.price} ₽</div>
        <Button
          className="add-product-to-cart"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          {product.inStock ? "Добавить в корзину" : "Нет в наличии"}
        </Button>
      </div>
    </div>
  );
};

export const ProductPage = styled(ProductPageContainer)`
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: flex-end;
  margin: 50px;

  .product {
    display: flex;
    gap: 30px;
  }

  .product-image {
    flex-shrink: 0;
    width: 200px;
    height: 200px;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }

  .product-info {
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;
  }

  .product-info__price {
    display: flex;
    gap: 30px;
    flex-direction: column;
    align-items: flex-end;
  }
`;
