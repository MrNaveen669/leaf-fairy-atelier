const required = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];

export function mediaStorageConfigured() {
  return required.every((name) => Boolean(process.env[name]));
}

export async function uploadImageBuffer(buffer, { contentType, filename }) {
  if (!mediaStorageConfigured()) {
    const error = new Error('Media storage is not configured');
    error.status = 503;
    throw error;
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const endpoint = `https://api.cloudinary.com/v1_1/${encodeURIComponent(cloudName)}/image/upload`;
  const form = new FormData();
  form.append('file', new Blob([buffer], { type: contentType }), filename || 'leaf-fairy-image');
  form.append('folder', process.env.CLOUDINARY_FOLDER || 'leaf-fairy/products');
  form.append('use_filename', 'true');
  form.append('unique_filename', 'true');
  form.append('overwrite', 'false');

  const credentials = Buffer.from(`${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`).toString('base64');
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { Authorization: `Basic ${credentials}` },
    body: form,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data?.error?.message || 'Image upload failed');
    error.status = 502;
    throw error;
  }

  return {
    url: data.secure_url,
    publicId: data.public_id,
    width: data.width,
    height: data.height,
    format: data.format,
    bytes: data.bytes,
  };
}
