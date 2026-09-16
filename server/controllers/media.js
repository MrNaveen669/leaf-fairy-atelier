import { mediaStorageConfigured, uploadImageBuffer } from '../services/mediaStorage.js';

const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);
const maxBytes = 8 * 1024 * 1024;

export function mediaStatus(req, res) {
  res.json({ configured: mediaStorageConfigured(), provider: mediaStorageConfigured() ? 'cloudinary' : null, maxBytes, allowedTypes: [...allowedTypes] });
}

export async function uploadMedia(req, res) {
  const contentType = String(req.headers['content-type'] || '').split(';')[0].trim().toLowerCase();
  if (!allowedTypes.has(contentType)) return res.status(415).json({ message: 'Only JPG, PNG and WebP images are supported' });
  const length = Number(req.headers['content-length'] || 0);
  if (length > maxBytes) return res.status(413).json({ message: 'Image must be 8 MB or smaller' });
  if (!Buffer.isBuffer(req.body) || !req.body.length) return res.status(400).json({ message: 'Image file is required' });
  if (req.body.length > maxBytes) return res.status(413).json({ message: 'Image must be 8 MB or smaller' });

  const filename = String(req.headers['x-file-name'] || 'leaf-fairy-image').replace(/[^a-zA-Z0-9._-]/g, '-').slice(0, 120);
  const media = await uploadImageBuffer(req.body, { contentType, filename });
  res.status(201).json({ ...media, sourceType: 'upload' });
}
