import 'dotenv/config';
import mongoose from 'mongoose';
import AdminUser from '../models/AdminUser.js';
import { hashAdminPassword } from '../services/adminAuth.js';

const uri=process.env.MONGODB_URI||process.env.MONGO_URI;
const email=process.env.ADMIN_SEED_EMAIL?.trim().toLowerCase();
const password=process.env.ADMIN_SEED_PASSWORD;
const name=process.env.ADMIN_SEED_NAME?.trim()||'Leaf Fairy Admin';
if(!uri)throw new Error('MONGODB_URI or MONGO_URI is required');
if(!email||!password)throw new Error('ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD are required');
await mongoose.connect(uri);
try{
  if(await AdminUser.exists({email}))throw new Error('Admin user already exists; seed will not overwrite credentials');
  const {salt,hash}=hashAdminPassword(password);
  await AdminUser.create({name,email,passwordSalt:salt,passwordHash:hash,role:'owner'});
  console.log(`Created admin user: ${email}`);
}finally{await mongoose.disconnect()}
