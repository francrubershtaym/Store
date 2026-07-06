import React, { useState } from 'react';
import { Link } from 'react-router';
import { submitOrder } from '../api/productsApi';
import { useCartStore } from '../store/cartStore';
import { formatPrice } from '../utils/formatPrice';

const Checkout = () => {
  const items = useCartStore((state) => state.items);
  const getTotal = useCartStore((state) => state.getTotal);
  const clearCart = useCartStore((state) => state.clearCart);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    comment: '',
  });
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState('');

  if (!items.length && !orderId) {
    return (
      <section className="page">
        <div className="container cart-empty">
          <p>Корзина пуста — нечего оформлять</p>
          <Link to="/" className="btn btn--primary">
            На главную
          </Link>
        </div>
      </section>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      setError('Заполните все обязательные поля');
      return;
    }

    setLoading(true);
    try {
      const result = await submitOrder({
        customer: form,
        items: items.map(({ id, title, quantity, price, salePrice }) => ({
          id,
          title,
          quantity,
          price: salePrice ?? price,
        })),
        total: getTotal(),
      });
      setOrderId(result.orderId);
      clearCart();
    } catch {
      setError('Ошибка при оформлении заказа. Попробуйте снова.');
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    return (
      <section className="page">
        <div className="container checkout-success">
          <h1 className="page__title">Заказ оформлен!</h1>
          <p>Номер заказа: <strong>{orderId}</strong></p>
          <p>Мы свяжемся с вами в ближайшее время для подтверждения.</p>
          <Link to="/" className="btn btn--primary">
            Вернуться в магазин
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page">
      <div className="container page__header">
        <h1 className="page__title">Оформление заказа</h1>
      </div>

      <div className="container checkout">
        <form className="checkout__form" onSubmit={handleSubmit}>
          <h2>Данные доставки</h2>

          <label className="checkout__label">
            Имя *
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="checkout__input"
              placeholder="Ваше имя"
            />
          </label>

          <label className="checkout__label">
            Телефон *
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="checkout__input"
              placeholder="+998 90 123 45 67"
            />
          </label>

          <label className="checkout__label">
            Адрес доставки *
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="checkout__input"
              placeholder="Город, улица, дом"
            />
          </label>

          <label className="checkout__label">
            Комментарий
            <textarea
              name="comment"
              value={form.comment}
              onChange={handleChange}
              className="checkout__input checkout__textarea"
              placeholder="Пожелания к заказу"
              rows={3}
            />
          </label>

          {error && <p className="checkout__error">{error}</p>}

          <button type="submit" className="btn btn--primary" disabled={loading}>
            {loading ? 'Оформляем...' : 'Подтвердить заказ'}
          </button>
        </form>

        <aside className="checkout__summary">
          <h2>Ваш заказ</h2>
          <ul className="checkout__items">
            {items.map((item) => (
              <li key={item.id} className="checkout__item">
                <span>
                  {item.title} × {item.quantity}
                </span>
                <span>{formatPrice((item.salePrice ?? item.price) * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <p className="checkout__total">
            Итого: <strong>{formatPrice(getTotal())}</strong>
          </p>
        </aside>
      </div>
    </section>
  );
};

export default Checkout;
