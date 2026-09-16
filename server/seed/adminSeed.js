import 'dotenv/config';
import mongoose from 'mongoose';
import AdminUser from '../models/AdminUser.js';
import { hashAdminPassword } from '../services/adminAuth.js';

const uri=process.env.MONGODB_URI||process.env.MONGO_URI;
const isProduction=process.env.NODE_ENV==='production';
const username=(process.env.ADMIN_SEED_USERNAME||(!isProduction?'admin':'')).trim().toLowerCase();
const email=process.env.ADMIN_SEED_EMAIL?.trim().toLowerCase()||undefined;
const password=process.env.ADMIN_SEED_PASSWORD||(!isProduction?'admin123':'');
const name=process.env.ADMIN_SEED_NAME?.trim()||'Leaf Fairy Admin';
if(!uri)throw new Error('MONGODB_URI or MONGO_URI is required');
if(!username||!password)throw new Error('ADMIN_SEED_USERNAME and ADMIN_SEED_PASSWORD are required in production');
await mongoose.connect(uri);
try{
  if(await AdminUser.exists({$or:[{username},...(email?[{email}]:[])]}))throw new Error('Admin user already exists; seed will not overwrite credentials');
  const {salt,hash}=hashAdminPassword(password);
  await AdminUser.create({name,username,email,passwordSalt:salt,passwordHash:hash,role:'owner',mustChangePassword:!isProduction&&username==='admin'&&password==='admin123'});
  console.log(`Created admin user: ${username}${email?` (${email})`:''}`);
  if(!isProduction&&username==='admin'&&password==='admin123')console.warn('Development-only credentials created. Change admin123 before production use.');
}finally{await mongoose.disconnect()}
