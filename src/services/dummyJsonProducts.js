const API_BASE = 'https://dummyjson.com';

const CATEGORY_MAP = {
  remeras: ['mens-shirts'],
  hoodies: ['tops', 'womens-dresses'],
  sneakers: ['mens-shoes', 'womens-shoes'],
};

const REVERSE_CATEGORY_MAP = {
  'mens-shirts': 'remeras',
  tops: 'hoodies',
  'womens-dresses': 'hoodies',
  'mens-shoes': 'sneakers',
  'womens-shoes': 'sneakers',
};

export const CATEGORY_LABELS = {
  remeras: 'Remeras',
  hoodies: 'Hoodies',
  sneakers: 'Sneakers',
};

export const NAV_ITEMS = [
  { label: 'Remeras', path: '/category/remeras' },
  { label: 'Hoodies', path: '/category/hoodies' },
  { label: 'Sneakers', path: '/category/sneakers' },
];

function normalizeProduct(product, storeCategory) {
  return {
    id: String(product.id),
    name: product.title,
    price: product.price,
    image: product.thumbnail,
    images: product.images,
    description: product.description,
    category: storeCategory,
    stock: product.stock,
    brand: product.brand || null,
    rating: product.rating,
  };
}

async function fetchCategory(apiCategory, storeCategory) {
  const response = await fetch(`${API_BASE}/products/category/${apiCategory}?limit=0`);

  if (!response.ok) {
    throw new Error('No se pudieron cargar los productos.');
  }

  const data = await response.json();
  return data.products.map((product) => normalizeProduct(product, storeCategory));
}

async function fetchStoreCategory(storeCategory) {
  const apiCategories = CATEGORY_MAP[storeCategory];

  if (!apiCategories) {
    throw new Error('Categoría no válida.');
  }

  const results = await Promise.all(
    apiCategories.map((apiCategory) => fetchCategory(apiCategory, storeCategory))
  );

  return results.flat();
}

export async function getProducts(category) {
  if (category) {
    return fetchStoreCategory(category);
  }

  const results = await Promise.all(
    Object.keys(CATEGORY_MAP).map((storeCategory) => fetchStoreCategory(storeCategory))
  );

  const seen = new Set();
  return results.flat().filter((product) => {
    if (seen.has(product.id)) return false;
    seen.add(product.id);
    return true;
  });
}

export async function getProductById(id) {
  const response = await fetch(`${API_BASE}/products/${id}`);

  if (!response.ok) {
    throw new Error('El producto no existe.');
  }

  const product = await response.json();
  const storeCategory = REVERSE_CATEGORY_MAP[product.category] || product.category;

  return normalizeProduct(product, storeCategory);
}
