import React from 'react';
import { Link } from 'react-router';
import CartItem from '../components/CartItem';
import { useCartStore } from '../store/cartStore';
import { formatPrice } from '../utils/formatPrice';

const Cart = () => {
  const items = useCartStore((state) => state.items);
  const getTotal = useCartStore((state) => state.getTotal);
  const clearCart = useCartStore((state) => state.clearCart);

  if (!items.length) {
    return (
      <section className="page">
        <div className="container page__header">
          <h1 className="page__title">Корзина</h1>
        </div>
        <div className="container cart-empty">
          <p>Корзина пуста</p>
          <Link to="/" className="btn btn--primary">
            Перейти к покупкам
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page">
      <div className="container page__header">
        <h1 className="page__title">Корзина</h1>
        <p className="page__subtitle">{items.length} товар(ов) в корзине</p>
      </div>

      <div className="container cart">
        <div className="cart__items">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <aside className="cart__summary">
          <h2 className="cart__summary-title">Итого</h2>
          <p className="cart__summary-total">{formatPrice(getTotal())}</p>
          <Link to="/checkout" className="btn btn--primary btn--full">
            Оформить заказ
          </Link>
          <button className="btn btn--secondary btn--full" onClick={clearCart}>
            Очистить корзину
          </button>
        </aside>
      </div>
    </section>
  );
};

export default Cart;
