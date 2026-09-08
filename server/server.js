import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import collections from './routes/collections.js';
import products from './routes/products.js';
import projects from './routes/projects.js';
import testimonials from './routes/testimonials.js';
import enquiries from './routes/enquiries.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json({ limit: '100kb' }));

app.get('/api/health', (req, res) => res.json({ ok: true }));
app.use('/api/collections', collections);
app.use('/api/products', products);
app.use('/api/projects', projects);
app.use('/api/testimonials', testimonials);
app.use('/api/enquiries', enquiries);

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const clientDist = path.resolve(__dirname, '../client/dist');
  app.use(express.static(clientDist));
  app.get('*', (req, res) => res.sendFile(path.join(clientDist, 'index.html')));
} else {
  app.use(notFound);
}

app.use(errorHandler);

connectDB()
  .then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
