import React from 'react';
import { Link } from 'react-router';
import { useCartStore } from '../store/cartStore';
import { formatPrice, getEffectivePrice } from '../utils/formatPrice';

const CartItem = ({ item }) => {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const price = getEffectivePrice(item);

  return (
    <div className="cart-item">
      <Link to={`/product/${item.id}`} className="cart-item__image">
        <img src={item.image} alt={item.title} width="80" height="95" />
      </Link>
      <div className="cart-item__info">
        <Link to={`/product/${item.id}`} className="cart-item__title">
          {item.title}
        </Link>
        <p className="cart-item__price">{formatPrice(price)}</p>
      </div>
      <div className="cart-item__quantity">
        <button
          className="cart-item__qty-btn"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          aria-label="Уменьшить количество"
        >
          −
        </button>
        <span>{item.quantity}</span>
        <button
          className="cart-item__qty-btn"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          aria-label="Увеличить количество"
        >
          +
        </button>
      </div>
      <p className="cart-item__total">{formatPrice(price * item.quantity)}</p>
      <button
        className="cart-item__remove"
        onClick={() => removeItem(item.id)}
        aria-label="Удалить товар"
      >
        ✕
      </button>
    </div>
  );
};

export default CartItem;
