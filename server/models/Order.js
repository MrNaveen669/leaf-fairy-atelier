import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true }, sku: { type: String, required: true },
  unitPrice: { type: Number, required: true, min: 0 }, quantity: { type: Number, required: true, min: 1 },
}, { _id: false });
const addressSchema = new mongoose.Schema({ name: String, email: String, phone: String, address: String, city: String, state: String, pincode: String }, { _id: false });
const schema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true, index: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  items: { type: [itemSchema], required: true }, deliveryAddress: { type: addressSchema, required: true },
  subtotal: { type: Number, required: true, min: 0 }, currency: { type: String, default: 'INR' },
  paymentStatus: { type: String, enum: ['unpaid', 'paid', 'failed', 'refunded'], default: 'unpaid' },
}, { timestamps: true });
export default mongoose.model('Order', schema);
