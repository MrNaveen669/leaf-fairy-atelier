import { z } from 'zod';
import AdminUser from '../models/AdminUser.js';
import { createAdminSession,verifyAdminPassword } from '../services/adminAuth.js';

const loginSchema=z.object({email:z.string().email().transform(v=>v.trim().toLowerCase()),password:z.string().min(1).max(256)});
const cookieName='leaf_fairy_admin_session';
const cookieOptions={httpOnly:true,sameSite:'strict',secure:process.env.NODE_ENV==='production',path:'/api/admin'};
export async function login(req,res){
  const parsed=loginSchema.safeParse(req.body);if(!parsed.success)return res.status(400).json({message:'Valid email and password are required'});
  const user=await AdminUser.findOne({email:parsed.data.email,active:true}).select('+passwordHash +passwordSalt');
  if(!user||!verifyAdminPassword(parsed.data.password,user.passwordSalt,user.passwordHash))return res.status(401).json({message:'Invalid email or password'});
  user.lastLoginAt=new Date();await user.save();
  const token=createAdminSession(user);res.cookie(cookieName,token,{...cookieOptions,maxAge:8*60*60*1000});
  return res.json({user:{id:user._id,name:user.name,email:user.email,role:user.role}});
}
export async function session(req,res){return res.json({user:req.adminUser})}
export async function logout(req,res){
  if(req.adminUser?._id)await AdminUser.updateOne({_id:req.adminUser._id},{$inc:{sessionVersion:1}});
  res.clearCookie(cookieName,cookieOptions);return res.status(204).end();
}
export const adminCookieName=cookieName;
