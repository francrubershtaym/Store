import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { fetchProductById } from '../api/productsApi';
import { useCartStore } from '../store/cartStore';
import { formatPrice, getEffectivePrice } from '../utils/formatPrice';
import { categories } from '../data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    setLoading(true);
    fetchProductById(id).then((data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p className="page-loading">Загрузка...</p>;

  if (!product) {
    return (
      <div className="container page">
        <p className="page-empty">Товар не найден</p>
        <Link to="/" className="btn btn--primary">
          На главную
        </Link>
      </div>
    );
  }

  const categoryLabel = categories.find((c) => c.id === product.category)?.label;
  const effectivePrice = getEffectivePrice(product);

  return (
    <section className="page product-detail">
      <div className="container">
        <Link to="/" className="product-detail__back">
          ← Назад в каталог
        </Link>

        <div className="product-detail__content">
          <div className="product-detail__image-wrap">
            {product.isSale && (
              <span className="cards__badge cards__badge--sale">Sale</span>
            )}
            {product.isNew && (
              <span className="cards__badge cards__badge--new">New</span>
            )}
            <img src={product.image} alt={product.title} />
          </div>

          <div className="product-detail__info">
            {categoryLabel && (
              <span className="product-detail__category">{categoryLabel}</span>
            )}
            <h1 className="product-detail__title">{product.title}</h1>
            <p className="product-detail__description">{product.description}</p>

            <div className="product-detail__prices">
              {product.salePrice ? (
                <>
                  <span className="product-detail__price product-detail__price--sale">
                    {formatPrice(product.salePrice)}
                  </span>
                  <span className="product-detail__price product-detail__price--old">
                    {formatPrice(product.price)}
                  </span>
                </>
              ) : (
                <span className="product-detail__price">{formatPrice(effectivePrice)}</span>
              )}
            </div>

            <button className="btn btn--primary" onClick={() => addItem(product)}>
              Добавить в корзину
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
