import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  key: { type: String, required: true, unique: true, trim: true, index: true },
  section: { type: String, required: true, trim: true, index: true },
  title: String,
  eyebrow: String,
  body: String,
  image: String,
  ctaLabel: String,
  ctaHref: String,
  enabled: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
  metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
}, { timestamps: true });

export default mongoose.model('ContentBlock', schema);
