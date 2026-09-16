import { z } from 'zod';
import Inventory from '../models/Inventory.js';
import Order from '../models/Order.js';

const quoteSchema = z.object({ items: z.array(z.object({ productId: z.string().min(1), quantity: z.number().int().min(1).max(25) })).min(1).max(50) });
const orderSchema = quoteSchema.extend({ deliveryAddress: z.object({ name: z.string().min(2).max(100), email: z.string().email(), phone: z.string().min(7).max(20), address: z.string().min(5).max(300), city: z.string().min(2).max(80), state: z.string().min(2).max(80), pincode: z.string().min(4).max(12) }) });

async function resolveItems(items) {
  const inventory = await Inventory.find({ product: { $in: items.map((item) => item.productId) }, active: true }).populate('product', 'name').lean();
  return items.map((item) => {
    const record = inventory.find((entry) => String(entry.product?._id) === item.productId);
    if (!record) throw Object.assign(new Error('One or more products are unavailable'), { status: 409 });
    const available = Math.max(0, record.stock - record.reserved);
    if (item.quantity > available) throw Object.assign(new Error(`${record.product.name} has only ${available} available`), { status: 409 });
    return { product: record.product._id, name: record.product.name, sku: record.sku, unitPrice: record.price, quantity: item.quantity, lineTotal: record.price * item.quantity };
  });
}

export async function quoteCart(req, res) {
  const parsed = quoteSchema.safeParse(req.body); if (!parsed.success) return res.status(400).json({ message: 'Invalid cart', issues: parsed.error.flatten() });
  const items = await resolveItems(parsed.data.items); res.json({ currency: 'INR', items, subtotal: items.reduce((sum, item) => sum + item.lineTotal, 0) });
}

export async function createOrder(req, res) {
  const parsed = orderSchema.safeParse(req.body); if (!parsed.success) return res.status(400).json({ message: 'Invalid order', issues: parsed.error.flatten() });
  const items = await resolveItems(parsed.data.items); const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const order = await Order.create({ orderNumber: `LF-${Date.now().toString(36).toUpperCase()}`, items, deliveryAddress: parsed.data.deliveryAddress, subtotal, currency: 'INR' });
  res.status(201).json({ id: order._id, orderNumber: order.orderNumber, status: order.status, paymentStatus: order.paymentStatus, subtotal: order.subtotal, currency: order.currency });
}
