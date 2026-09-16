import crypto from 'crypto';

function configuredProvider() {
  if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) return 'razorpay';
  return 'mock';
}

async function razorpayRequest(path, body) {
  const auth = Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString('base64');
  const response = await fetch(`https://api.razorpay.com/v1${path}`, { method: 'POST', headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const data = await response.json();
  if (!response.ok) throw Object.assign(new Error(data?.error?.description || 'Payment provider request failed'), { status: 502 });
  return data;
}

export async function createProviderOrder({ amount, currency, receipt }) {
  const provider = configuredProvider();
  if (provider === 'mock') return { provider, id: `mock_${crypto.randomUUID()}`, amount, currency, keyId: null };
  const order = await razorpayRequest('/orders', { amount: Math.round(amount * 100), currency, receipt });
  return { provider, id: order.id, amount, currency, keyId: process.env.RAZORPAY_KEY_ID };
}

export function verifyProviderPayment({ provider, providerOrderId, providerPaymentId, signature }) {
  if (provider === 'mock') return process.env.NODE_ENV !== 'production' && signature === 'mock-success';
  if (!providerPaymentId || !signature) return false;
  const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(`${providerOrderId}|${providerPaymentId}`).digest('hex');
  const left = Buffer.from(expected); const right = Buffer.from(signature);
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

export function paymentProviderName() { return configuredProvider(); }
