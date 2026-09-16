import Product from '../models/Product.js';
import Inventory from '../models/Inventory.js';

async function attachCommerce(products) {
  const ids = products.map((product) => product._id); const rows = await Inventory.find({ product: { $in: ids }, active: true }).lean();
  return products.map((product) => { const inventory = rows.find((row) => String(row.product) === String(product._id)); return { ...product, commerce: inventory ? { sku: inventory.sku, price: inventory.price, compareAtPrice: inventory.compareAtPrice, currency: inventory.currency, available: Math.max(0, inventory.stock - inventory.reserved), inStock: inventory.stock - inventory.reserved > 0 } : null }; });
}
export async function getProducts(req, res) { const filter = req.query.collection ? { collectionSlug: req.query.collection } : {}; const products = await Product.find(filter).lean(); res.json(await attachCommerce(products)); }
export async function getProductById(req, res) { const product = await Product.findById(req.params.id).lean(); if (!product) return res.status(404).json({ message: 'Product not found' }); const [result] = await attachCommerce([product]); res.json(result); }
