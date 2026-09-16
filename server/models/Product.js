import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  collectionSlug: { type: String, required: true, index: true },
  name: { type: String, required: true }, description: String, priceRange: String, image: String, alt: String,
  slug: { type: String, index: true }, featured: { type: Boolean, default: false },
  dimensions: String, materials: String, care: String, stylingNotes: String,
}, { timestamps: true });
export default mongoose.model('Product', schema);
