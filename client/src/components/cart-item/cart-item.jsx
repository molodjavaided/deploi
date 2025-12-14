import styled from "styled-components";
import { Button } from "../button/button";

const CartItemContainer = ({ className, item, onRemove, onUpdateQuantity }) => {
  const handleRemoveItem = () => {
    onRemove(item.productId);
  };

  const handleMinusItem = () => {
    onUpdateQuantity(item.productId, item.quantity - 1);
  };

  const handlePlusItem = () => {
    onUpdateQuantity(item.productId, item.quantity + 1);
  };

  return (
    <div className={className}>
      <div className="item-image">
        <img src={item.imageUrl} alt={item.title} />
      </div>

      <div className="item-wrapper">
        <div className="item-info">
          <div className="item-title">{item.title}</div>
          <div className="item-description">{item.description}</div>
          <div className="item-price">Цена: {item.price} ₽</div>
          <div className="item-quantity">{item.quantity} шт</div>
        </div>

        <div className="item-controll">
          <div className="buttons">
            <Button
              onClick={handleMinusItem}
              disabled={item.quantity <= 1}
              className="quantity-btn"
            >
              -
            </Button>
            <Button
              onClick={handlePlusItem}
              disabled={!item.inStock} // Добавить наличие на складе
              className="quantity-btn"
            >
              +
            </Button>
          </div>
          <Button className="remove-btn" onClick={handleRemoveItem}>
            Удалить товар из корзины
          </Button>
        </div>
      </div>

      <div className="item-result">{item.totalPrice} ₽</div>
    </div>
  );
};

export const CartItem = styled(CartItemContainer)`
  display: flex;
  gap: 20px;
  justify-content: space-between;

  .item-controll {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    gap: 20px;
  }

  .buttons {
    display: flex;
    gap: 10px;
  }

  .item-image {
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

  .item-wrapper {
    width: 100%;
  }

  .item-result {
    display: flex;
    align-items: center;
    min-width: 100px;
  }
`;
