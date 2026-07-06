import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api/productsApi';
import ProductGrid from '../components/ProductGrid';
import Pagination from '../components/Pagination';

const ITEMS_PER_PAGE = 12;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setLoading(true);
    const skip = (currentPage - 1) * ITEMS_PER_PAGE;
    fetchProducts(skip, ITEMS_PER_PAGE).then((data) => {
      setProducts(data.products);
      setTotal(data.total);
      setLoading(false);
      window.scrollTo(0, 0);
    });
  }, [currentPage]);

  if (loading) return <p className="page-loading">Загрузка...</p>;

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <section className="page">
      <div className="container page__header">
        <h1 className="page__title">Каталог товаров</h1>
        <p className="page__subtitle">Лучшая одежда и аксессуары для активного образа жизни</p>
      </div>
      <ProductGrid products={products} />
      {totalPages > 1 && (
        <div className="container">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </section>
  );
};

export default Home;
