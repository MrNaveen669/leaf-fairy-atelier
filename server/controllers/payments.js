import { z } from 'zod';
import Order from '../models/Order.js';
import Payment from '../models/Payment.js';
import { createProviderOrder, verifyProviderPayment } from '../services/paymentProvider.js';

const createSchema = z.object({ orderId: z.string().min(1) });
const verifySchema = z.object({ paymentId: z.string().min(1), providerPaymentId: z.string().optional(), signature: z.string().min(1) });

export async function createPayment(req, res) {
  const parsed = createSchema.safeParse(req.body); if (!parsed.success) return res.status(400).json({ message: 'Invalid payment request' });
  const order = await Order.findById(parsed.data.orderId).lean();
  if (!order) return res.status(404).json({ message: 'Order not found' });
  if (order.paymentStatus === 'paid') return res.status(409).json({ message: 'Order is already paid' });
  const providerOrder = await createProviderOrder({ amount: order.subtotal, currency: order.currency, receipt: order.orderNumber });
  const payment = await Payment.create({ order: order._id, provider: providerOrder.provider, providerOrderId: providerOrder.id, amount: order.subtotal, currency: order.currency });
  res.status(201).json({ paymentId: payment._id, provider: payment.provider, providerOrderId: payment.providerOrderId, amount: payment.amount, currency: payment.currency, keyId: providerOrder.keyId });
}

export async function verifyPayment(req, res) {
  const parsed = verifySchema.safeParse(req.body); if (!parsed.success) return res.status(400).json({ message: 'Invalid verification request' });
  const payment = await Payment.findById(parsed.data.paymentId); if (!payment) return res.status(404).json({ message: 'Payment not found' });
  if (payment.status === 'paid') return res.json({ ok: true, status: payment.status });
  const valid = verifyProviderPayment({ provider: payment.provider, providerOrderId: payment.providerOrderId, providerPaymentId: parsed.data.providerPaymentId, signature: parsed.data.signature });
  if (!valid) { payment.status = 'failed'; await payment.save(); await Order.findByIdAndUpdate(payment.order, { paymentStatus: 'failed' }); return res.status(400).json({ message: 'Payment verification failed' }); }
  payment.status = 'paid'; payment.providerPaymentId = parsed.data.providerPaymentId; await payment.save();
  await Order.findByIdAndUpdate(payment.order, { paymentStatus: 'paid', status: 'confirmed' });
  res.json({ ok: true, status: payment.status });
}
