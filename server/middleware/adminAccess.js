import AdminUser from '../models/AdminUser.js';
import { verifyAdminSession } from '../services/adminAuth.js';
import { adminCookieName } from '../controllers/adminAuth.js';

function cookies(header=''){return Object.fromEntries(header.split(';').map(v=>v.trim()).filter(Boolean).map(v=>{const i=v.indexOf('=');return i<0?[v,'']:[v.slice(0,i),decodeURIComponent(v.slice(i+1))]}))}
export async function adminAccess(req,res,next){
  try{
    const token=cookies(req.headers.cookie||'')[adminCookieName];
    const session=verifyAdminSession(token);
    if(!session)return res.status(401).json({message:'Admin authentication required'});
    const user=await AdminUser.findOne({_id:session.sub,active:true}).lean();
    if(!user||Number(user.sessionVersion||0)!==Number(session.sv))return res.status(401).json({message:'Admin session expired'});
    req.adminUser={_id:user._id,name:user.name,email:user.email,role:user.role};next();
  }catch(error){if(error.message?.includes('ADMIN_SESSION_SECRET'))return res.status(503).json({message:'Admin authentication is not configured'});next(error)}
}
