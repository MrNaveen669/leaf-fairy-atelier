import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
  sku: { type: String, required: true, unique: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  compareAtPrice: { type: Number, min: 0 },
  currency: { type: String, default: 'INR', enum: ['INR'] },
  stock: { type: Number, required: true, min: 0, default: 0 },
  reserved: { type: Number, required: true, min: 0, default: 0 },
  active: { type: Boolean, default: true },
}, { timestamps: true });

schema.virtual('available').get(function available() { return Math.max(0, this.stock - this.reserved); });
schema.set('toJSON', { virtuals: true });

export default mongoose.model('Inventory', schema);
