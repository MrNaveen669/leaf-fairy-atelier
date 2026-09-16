import { z } from 'zod';
import AdminUser from '../models/AdminUser.js';
import { createAdminSession,hashAdminPassword,verifyAdminPassword } from '../services/adminAuth.js';
import { clearAdminLoginAttempts } from '../middleware/security.js';

const loginSchema=z.object({identifier:z.string().trim().min(1).max(160).transform(v=>v.toLowerCase()),password:z.string().min(1).max(256)});
const passwordSchema=z.object({currentPassword:z.string().min(1).max(256),newPassword:z.string().min(10).max(256)}).refine(v=>v.currentPassword!==v.newPassword,{message:'New password must be different from the current password',path:['newPassword']});
const cookieName='leaf_fairy_admin_session';
const cookieOptions={httpOnly:true,sameSite:'strict',secure:process.env.NODE_ENV==='production',path:'/api/admin'};
const publicUser=user=>({id:user._id,name:user.name,username:user.username,email:user.email||'',role:user.role,mustChangePassword:Boolean(user.mustChangePassword)});
export async function login(req,res){const parsed=loginSchema.safeParse(req.body);if(!parsed.success)return res.status(400).json({message:'Username/email and password are required'});const user=await AdminUser.findOne({active:true,$or:[{username:parsed.data.identifier},{email:parsed.data.identifier}]}).select('+passwordHash +passwordSalt');if(!user||!verifyAdminPassword(parsed.data.password,user.passwordSalt,user.passwordHash))return res.status(401).json({message:'Invalid username/email or password'});clearAdminLoginAttempts(req);user.lastLoginAt=new Date();await user.save();const token=createAdminSession(user);res.cookie(cookieName,token,{...cookieOptions,maxAge:8*60*60*1000});return res.json({user:publicUser(user)})}
export async function session(req,res){return res.json({user:req.adminUser})}
export async function changePassword(req,res){
 const parsed=passwordSchema.safeParse(req.body);if(!parsed.success)return res.status(400).json({message:parsed.error.issues[0]?.message||'Current and new password are required'});
 const user=await AdminUser.findById(req.adminUser._id).select('+passwordHash +passwordSalt');if(!user||!verifyAdminPassword(parsed.data.currentPassword,user.passwordSalt,user.passwordHash))return res.status(401).json({message:'Current password is incorrect'});
 const {salt,hash}=hashAdminPassword(parsed.data.newPassword);user.passwordSalt=salt;user.passwordHash=hash;user.mustChangePassword=false;user.sessionVersion=Number(user.sessionVersion||0)+1;await user.save();
 res.clearCookie(cookieName,cookieOptions);return res.json({message:'Password changed. Please sign in again.'});
}
export async function logout(req,res){if(req.adminUser?._id)await AdminUser.updateOne({_id:req.adminUser._id},{$inc:{sessionVersion:1}});res.clearCookie(cookieName,cookieOptions);return res.status(204).end()}
export const adminCookieName=cookieName;
