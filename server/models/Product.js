import mongoose from 'mongoose';
const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  alt: { type: String, default: '' },
  sourceType: { type: String, enum: ['upload','url'], default: 'url' },
  isCover: { type: Boolean, default: false },
  sortOrder: { type: Number, default: 0 },
}, { _id: true });
const schema = new mongoose.Schema({
  collectionSlug: { type: String, required: true, index: true },
  productTypeSlug: { type: String, default: '', index: true },
  name: { type: String, required: true }, description: String, priceRange: String, image: String, alt: String,
  images: { type: [imageSchema], default: [] },
  slug: { type: String, index: true }, featured: { type: Boolean, default: false },
  dimensions: String, materials: String, care: String, stylingNotes: String,
}, { timestamps: true });
export default mongoose.model('Product', schema);
