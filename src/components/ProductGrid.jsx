import React from 'react';
import Cards from './Cards';

const ProductGrid = ({ products, emptyMessage = 'Товары не найдены', className = 'container cards' }) => {
  if (!products.length) {
    return <p className="page-empty">{emptyMessage}</p>;
  }

  return (
    <div className={className}>
      {products.map((product) => (
        <Cards key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
