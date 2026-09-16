import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import Product from '../models/Product.js';
import Inventory from '../models/Inventory.js';

const priceByCollection = { 'statement-trees': 68000, 'botanical-studies': 8500, 'florals-orchids': 12000, 'decor-accessories': 18000 };
const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

async function seed() {
  await connectDB(); const products = await Product.find({}); if (!products.length) throw new Error('Run the existing catalogue seed first.');
  await Inventory.deleteMany({});
  for (const [index, product] of products.entries()) {
    const slug = slugify(product.name); product.slug = slug; product.featured = index < 5; product.dimensions ||= 'Scale varies by selected piece; confirm final dimensions with the atelier.'; product.materials ||= 'Premium artificial botanical materials with a considered vessel/armature composition.'; product.care ||= 'Dust gently with a soft dry cloth. Keep away from direct heat and harsh cleaning agents.'; product.stylingNotes ||= 'Allow negative space around the piece so its silhouette can read clearly.'; await product.save();
    const base = priceByCollection[product.collectionSlug] || 15000; const price = base + (index % 6) * Math.round(base * .12);
    await Inventory.create({ product: product._id, sku: `LF-${product.collectionSlug.slice(0, 3).toUpperCase()}-${String(index + 1).padStart(3, '0')}`, price, compareAtPrice: index % 4 === 0 ? Math.round(price * 1.12) : undefined, currency: 'INR', stock: 3 + (index % 9), reserved: index % 3 === 0 ? 1 : 0, active: true });
  }
  console.log(`Seeded commerce inventory for ${products.length} dummy catalogue products.`); await mongoose.disconnect();
}
seed().catch(async (error) => { console.error(error); await mongoose.disconnect(); process.exit(1); });
