const localImages = {
  shop: '/images/hero/hero-main.png',
  statementTrees: '/images/categories/statement-trees.png',
  artificialPlants: '/images/categories/artificial-plants.png',
  floralsOrchids: '/images/categories/florals-orchids.png',
};

export const catalogCollectionOrder = [
  'statement-trees',
  'botanical-studies',
  'florals-orchids',
  'decor-accessories',
];

const collectionPresentation = {
  'statement-trees': {
    title: 'Statement Trees',
    image: localImages.statementTrees,
    productImage: localImages.statementTrees,
  },
  'botanical-studies': {
    title: 'Artificial Plants',
    image: localImages.artificialPlants,
    productImage: localImages.artificialPlants,
  },
  'florals-orchids': {
    title: 'Florals & Orchids',
    image: localImages.floralsOrchids,
    productImage: localImages.floralsOrchids,
  },
  'decor-accessories': {
    title: 'Planters & Décor',
    image: null,
    productImage: localImages.shop,
  },
};

export const catalogCollectionLinks = catalogCollectionOrder.map((slug) => ({
  slug,
  title: collectionPresentation[slug].title,
}));

export function getCollectionPresentation(slug, fallbackTitle = 'Collection') {
  return collectionPresentation[slug] || {
    title: fallbackTitle,
    image: null,
    productImage: localImages.shop,
  };
}

export function getCatalogProductFallback(product) {
  return getCollectionPresentation(product.collectionSlug).productImage;
}

export function orderCatalogCollections(collections) {
  return [...collections].sort((left, right) => {
    const leftIndex = catalogCollectionOrder.indexOf(left.slug);
    const rightIndex = catalogCollectionOrder.indexOf(right.slug);
    const normalizedLeft = leftIndex === -1 ? Number.MAX_SAFE_INTEGER : leftIndex;
    const normalizedRight = rightIndex === -1 ? Number.MAX_SAFE_INTEGER : rightIndex;

    if (normalizedLeft !== normalizedRight) return normalizedLeft - normalizedRight;
    return left.title.localeCompare(right.title);
  });
}

export function sortCatalogProducts(products, sortBy) {
  const sorted = [...products];

  if (sortBy === 'name') {
    return sorted.sort((left, right) => left.name.localeCompare(right.name));
  }

  return sorted.sort((left, right) => {
    const leftDate = left.createdAt ? Date.parse(left.createdAt) || 0 : 0;
    const rightDate = right.createdAt ? Date.parse(right.createdAt) || 0 : 0;
    return rightDate - leftDate;
  });
}

export const catalogShopImage = localImages.shop;
