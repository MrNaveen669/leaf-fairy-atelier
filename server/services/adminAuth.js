import crypto from 'crypto';

const ITERATIONS=210000;
const KEY_LENGTH=32;
const DIGEST='sha256';
const SESSION_TTL_SECONDS=60*60*8;

function secret(){
  const value=process.env.ADMIN_SESSION_SECRET;
  if(!value||value.length<32)throw new Error('ADMIN_SESSION_SECRET must be configured with at least 32 characters');
  return value;
}
function b64(value){return Buffer.from(value).toString('base64url')}
function unb64(value){return Buffer.from(value,'base64url').toString('utf8')}
function signature(value){return crypto.createHmac('sha256',secret()).update(value).digest('base64url')}
export function hashAdminPassword(password,salt=crypto.randomBytes(16).toString('hex')){
  if(typeof password!=='string'||password.length<10)throw new Error('Admin password must be at least 10 characters');
  return {salt,hash:crypto.pbkdf2Sync(password,salt,ITERATIONS,KEY_LENGTH,DIGEST).toString('hex')};
}
export function verifyAdminPassword(password,salt,expected){
  const actual=crypto.pbkdf2Sync(password,salt,ITERATIONS,KEY_LENGTH,DIGEST);
  const target=Buffer.from(expected,'hex');
  return target.length===actual.length&&crypto.timingSafeEqual(target,actual);
}
export function createAdminSession(user){
  const now=Math.floor(Date.now()/1000);
  const payload=b64(JSON.stringify({sub:String(user._id),sv:user.sessionVersion||0,iat:now,exp:now+SESSION_TTL_SECONDS}));
  return `${payload}.${signature(payload)}`;
}
export function verifyAdminSession(token){
  if(!token||typeof token!=='string')return null;
  const [payload,sig]=token.split('.');if(!payload||!sig)return null;
  const expected=signature(payload),a=Buffer.from(sig),b=Buffer.from(expected);
  if(a.length!==b.length||!crypto.timingSafeEqual(a,b))return null;
  try{const data=JSON.parse(unb64(payload));if(!data.sub||!data.exp||data.exp<=Math.floor(Date.now()/1000))return null;return data}catch{return null}
}
export const adminSessionTtlSeconds=SESSION_TTL_SECONDS;
