import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { fetchProductsByCategory } from '../api/productsApi';
import { categories } from '../data/products';
import ProductGrid from '../components/ProductGrid';
import Pagination from '../components/Pagination';

const ITEMS_PER_PAGE = 12;

const Categories = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('cat') || 'all';
  const currentPageParam = searchParams.get('page') || '1';
  const currentPage = parseInt(currentPageParam);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setLoading(true);
    const skip = (currentPage - 1) * ITEMS_PER_PAGE;
    fetchProductsByCategory(activeCategory, skip, ITEMS_PER_PAGE).then((data) => {
      setProducts(data.products);
      setTotal(data.total);
      setLoading(false);
      window.scrollTo(0, 0);
    });
  }, [activeCategory, currentPage]);

  const handleCategoryChange = (categoryId) => {
    if (categoryId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ cat: categoryId });
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage === 1) {
      setSearchParams({ cat: activeCategory === 'all' ? '' : activeCategory });
    } else {
      setSearchParams({ 
        ...(activeCategory !== 'all' && { cat: activeCategory }), 
        page: newPage.toString() 
      });
    }
  };

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <section className="page">
      <div className="container page__header">
        <h1 className="page__title">Категории</h1>
        <p className="page__subtitle">Выберите категорию для просмотра товаров</p>
      </div>

      <div className="container categories">
        <aside className="categories__sidebar">
          <ul className="categories__list">
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  className={`categories__btn ${
                    activeCategory === cat.id ? 'categories__btn--active' : ''
                  }`}
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  {cat.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="categories__content">
          {loading ? (
            <p className="page-loading">Загрузка...</p>
          ) : (
            <>
              <ProductGrid
                products={products}
                className="cards"
                emptyMessage="В этой категории пока нет товаров"
              />
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Categories;
