const loginAttempts=new Map();
const WINDOW_MS=15*60*1000;
const MAX_ATTEMPTS=8;

export function securityHeaders(req,res,next){
  res.setHeader('X-Content-Type-Options','nosniff');
  res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options','DENY');
  res.setHeader('Permissions-Policy','camera=(), microphone=(), geolocation=(), payment=(), usb=()');
  res.setHeader('Cross-Origin-Opener-Policy','same-origin');
  res.setHeader('Cross-Origin-Resource-Policy','same-origin');
  res.setHeader('Content-Security-Policy',"default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; script-src 'self'; connect-src 'self' https:; upgrade-insecure-requests");
  if(process.env.NODE_ENV==='production')res.setHeader('Strict-Transport-Security','max-age=31536000; includeSubDomains');
  next();
}

function clientKey(req){return `${req.ip||req.socket?.remoteAddress||'unknown'}:${String(req.body?.email||'').trim().toLowerCase()}`}
export function adminLoginRateLimit(req,res,next){
  const now=Date.now(),key=clientKey(req),record=loginAttempts.get(key);
  if(!record||now-record.startedAt>=WINDOW_MS){loginAttempts.set(key,{count:1,startedAt:now});return next()}
  if(record.count>=MAX_ATTEMPTS){const retry=Math.max(1,Math.ceil((WINDOW_MS-(now-record.startedAt))/1000));res.setHeader('Retry-After',String(retry));return res.status(429).json({message:'Too many login attempts. Try again later.'})}
  record.count+=1;next();
}
export function clearAdminLoginAttempts(req){loginAttempts.delete(clientKey(req))}
