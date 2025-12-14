import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { CartItem } from "../../components/cart-item/cart-item";
import { cartActions } from "../../store/actions";
import { Button } from "../../components";
import {
  clearServerCart,
  makeOrder,
  removeItemFromCartServer,
  updateQuantityServer,
} from "../../store/actions/cart-async";

const CartPageContainer = ({ className }) => {
  const dispatch = useDispatch();
  const { items, totalPrice, totalQuantity } = useSelector(
    (state) => state.cart
  );

  const handleUpdateQuantity = async (productId, quantity) => {
    try {
      dispatch(cartActions.updateQuantity(productId, quantity));

      await dispatch(updateQuantityServer(productId, quantity));
    } catch (error) {
      console.log("Ошибка при обновлении кол-ва", error.message);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      dispatch(cartActions.removeFromCart(productId));

      await dispatch(removeItemFromCartServer(productId));
    } catch (error) {
      console.log("Ошибка удаления с корзины сервера", error.message);
    }
  };

  const handleClearCart = async () => {
    try {
      dispatch(cartActions.clearCart());

      await dispatch(clearServerCart());
    } catch (error) {
      console.log("Ошибка очистки корзины с сервера", error.message);
    }
  };

  const handleMakeOrder = async () => {
    try {
      if (!items || items.length === 0) {
        alert("Ваша корзина пуста");
        return;
      }
      const result = await dispatch(makeOrder());

      if (result.success) {
        alert("Заказ оформлен");
      }
    } catch (error) {
      alert("Ошибка оформления заказа", error.message);
    }
  };

  if (!items || items.length === 0) {
    return (
      <div className="">
        <h2>Ваша корзина пуста</h2>
      </div>
    );
  }

  return (
    <div className={className}>
      <h2>Ваши товары</h2>

      <div className="cart-items">
        {items.map((item) => (
          <CartItem
            key={item.productId || item._id}
            item={item}
            onRemove={handleRemoveItem}
            onUpdateQuantity={handleUpdateQuantity}
          />
        ))}
      </div>

      <div className="cart-result">
        <div className="cart-total-quantity">Товар {totalQuantity} шт</div>
        <div className="cart-total-price">К оплате {totalPrice} ₽</div>
      </div>

      <div className="cart-actions">
        <Button className="cart-order__btn" onClick={handleMakeOrder}>
          Оформить заказ
        </Button>
        <Button className="cart-clear__btn" onClick={handleClearCart}>
          Очистить корзину
        </Button>
      </div>
    </div>
  );
};

export const CartPage = styled(CartPageContainer)`
  display: flex;
  flex-direction: column;
  gap: 50px;
  margin: 50px;

  h2 {
    text-align: center;
  }

  .cart-items {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
  }
`;
