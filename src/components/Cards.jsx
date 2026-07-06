import React from 'react';
import { Link } from 'react-router';
import { useCartStore } from '../store/cartStore';
import { formatPrice, getEffectivePrice } from '../utils/formatPrice';

const Cards = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);
  const effectivePrice = getEffectivePrice(product);

  const handleBuy = (e) => {
    e.preventDefault();
    addItem(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="cards__item">
      {product.isSale && <span className="cards__badge cards__badge--sale">Sale</span>}
      {product.isNew && <span className="cards__badge cards__badge--new">New</span>}
      <img src={product.image} alt={product.title} width="264" height="315" />
      <h3 className="cards__item-title">{product.title}</h3>
      <div className="cards__item-price_btn">
        <div className="cards__item-prices">
          {product.salePrice ? (
            <>
              <p className="cards__item-price cards__item-price--sale">
                {formatPrice(product.salePrice)}
              </p>
              <p className="cards__item-price cards__item-price--old">
                {formatPrice(product.price)}
              </p>
            </>
          ) : (
            <p className="cards__item-price">{formatPrice(effectivePrice)}</p>
          )}
        </div>
        <button className="cards__item-btn" onClick={handleBuy}>
          Купить
        </button>
      </div>
    </Link>
  );
};

export default Cards;
