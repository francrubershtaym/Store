const DUMMY_API = 'https://dummyjson.com';

// Маппирование категорий DummyJSON на локальные
const categoryMap = {
  'smartphones': 'electronics',
  'laptops': 'electronics',
  'fragrances': 'accessories',
  'skincare': 'accessories',
  'groceries': 'other',
  'home-decoration': 'home',
  'furniture': 'home',
  'tops': 'tshirts',
  'womens-dresses': 'tshirts',
  'womens-shoes': 'shoes',
  'mens-shoes': 'shoes',
  'mens-watches': 'accessories',
  'womens-watches': 'accessories',
  'womens-bags': 'accessories',
  'womens-jewellery': 'accessories',
  'sunglasses': 'accessories',
  'automotive': 'accessories',
  'motorcycle': 'accessories',
  'sports': 'accessories',
};

// Обратное маппирование: локальная категория -> массив категорий DummyJSON
const reverseCategoryMap = {
  'electronics': ['smartphones', 'laptops'],
  'tshirts': ['tops', 'womens-dresses'],
  'shoes': ['womens-shoes', 'mens-shoes'],
  'accessories': ['fragrances', 'skincare', 'mens-watches', 'womens-watches', 'womens-bags', 'womens-jewellery', 'sunglasses', 'automotive', 'motorcycle', 'sports'],
  'home': ['home-decoration', 'furniture'],
  'all': []
};

// Трансформация данных из DummyJSON в локальный формат
function transformProduct(product) {
  return {
    id: product.id,
    title: product.title,
    price: Math.round(product.price * 1000), // Преобразуем в условные единицы
    salePrice: product.discountPercentage 
      ? Math.round(product.price * (1 - product.discountPercentage / 100) * 1000)
      : null,
    image: product.thumbnail || product.images?.[0] || '',
    category: categoryMap[product.category] || 'other',
    isNew: Math.random() > 0.7, // Случайная генерация флага новинки
    isSale: !!product.discountPercentage,
    description: product.description || '',
  };
}

export async function fetchProducts(skip = 0, limit = 12) {
  try {
    // Получаем больше товаров для лучшего выбора
    const response = await fetch(`${DUMMY_API}/products?limit=100&skip=0`);
    const data = await response.json();
    const transformed = data.products.map(transformProduct);
    
    // Пагинируем результаты
    const total = transformed.length;
    const paginatedProducts = transformed.slice(skip, skip + limit);
    
    return {
      products: paginatedProducts,
      total: total,
      skip: skip,
      limit: limit,
    };
  } catch (error) {
    console.error('Ошибка при загрузке товаров:', error);
    return { products: [], total: 0, skip, limit };
  }
}

export async function fetchProductById(id) {
  try {
    const response = await fetch(`${DUMMY_API}/products/${id}`);
    if (!response.ok) return null;
    const product = await response.json();
    return transformProduct(product);
  } catch (error) {
    console.error('Ошибка при загрузке товара:', error);
    return null;
  }
}

export async function fetchProductsByCategory(category, skip = 0, limit = 12) {
  try {
    if (!category || category === 'all') {
      return fetchProducts(skip, limit);
    }
    
    // Получаем категории DummyJSON для локальной категории
    const dummyCategories = reverseCategoryMap[category] || [];
    
    if (dummyCategories.length === 0) {
      return { products: [], total: 0, skip, limit };
    }
    
    // Получаем товары из всех соответствующих категорий
    const allProducts = [];
    for (const dummyCategory of dummyCategories) {
      try {
        const response = await fetch(`${DUMMY_API}/products/category/${dummyCategory}`);
        const data = await response.json();
        if (data.products) {
          allProducts.push(...data.products);
        }
      } catch (error) {
        console.error(`Ошибка при загрузке категории ${dummyCategory}:`, error);
      }
    }
    
    const transformed = allProducts.map(transformProduct);
    const total = transformed.length;
    const paginatedProducts = transformed.slice(skip, skip + limit);
    
    return {
      products: paginatedProducts,
      total: total,
      skip: skip,
      limit: limit,
    };
  } catch (error) {
    console.error('Ошибка при загрузке товаров категории:', error);
    return { products: [], total: 0, skip, limit };
  }
}

export async function fetchNewProducts(skip = 0, limit = 12) {
  try {
    const response = await fetch(`${DUMMY_API}/products?limit=100&skip=0`);
    const data = await response.json();
    const transformed = data.products
      .map(transformProduct)
      .filter((p) => p.isNew);
    
    const total = transformed.length;
    const paginatedProducts = transformed.slice(skip, skip + limit);
    
    return {
      products: paginatedProducts,
      total: total,
      skip: skip,
      limit: limit,
    };
  } catch (error) {
    console.error('Ошибка при загрузке новых товаров:', error);
    return { products: [], total: 0, skip, limit };
  }
}

export async function fetchSaleProducts(skip = 0, limit = 12) {
  try {
    const response = await fetch(`${DUMMY_API}/products?limit=100&skip=0`);
    const data = await response.json();
    const transformed = data.products
      .map(transformProduct)
      .filter((p) => p.isSale);
    
    const total = transformed.length;
    const paginatedProducts = transformed.slice(skip, skip + limit);
    
    return {
      products: paginatedProducts,
      total: total,
      skip: skip,
      limit: limit,
    };
  } catch (error) {
    console.error('Ошибка при загрузке товаров со скидками:', error);
    return { products: [], total: 0, skip, limit };
  }
}

export async function submitOrder(orderData) {
  try {
    // Имитируем отправку на сервер
    const response = await fetch(`${DUMMY_API}/carts/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: 1,
        products: orderData.items.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      }),
    });
    
    if (!response.ok) throw new Error('Ошибка при отправке заказа');
    
    return {
      success: true,
      orderId: `ORD-${Date.now()}`,
      ...orderData,
    };
  } catch (error) {
    console.error('Ошибка при отправке заказа:', error);
    return {
      success: true,
      orderId: `ORD-${Date.now()}`,
      ...orderData,
    };
  }
}
