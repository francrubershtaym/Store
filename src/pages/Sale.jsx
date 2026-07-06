import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { fetchSaleProducts } from '../api/productsApi';
import ProductGrid from '../components/ProductGrid';
import Pagination from '../components/Pagination';

const ITEMS_PER_PAGE = 12;

const Sale = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPageParam = searchParams.get('page') || '1';
  const currentPage = parseInt(currentPageParam);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setLoading(true);
    const skip = (currentPage - 1) * ITEMS_PER_PAGE;
    fetchSaleProducts(skip, ITEMS_PER_PAGE).then((data) => {
      setProducts(data.products);
      setTotal(data.total);
      setLoading(false);
      window.scrollTo(0, 0);
    });
  }, [currentPage]);

  if (loading) return <p className="page-loading">Загрузка...</p>;

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage === 1) {
      setSearchParams({});
    } else {
      setSearchParams({ page: newPage.toString() });
    }
  };

  return (
    <section className="page">
      <div className="container page__header">
        <h1 className="page__title">Скидки</h1>
        <p className="page__subtitle">Выгодные предложения — успейте купить!</p>
      </div>
      <ProductGrid products={products} emptyMessage="Скидок сейчас нет" />
      {totalPages > 1 && (
        <div className="container">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </section>
  );
};

export default Sale;
