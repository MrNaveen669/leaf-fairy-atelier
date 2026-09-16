export function adminAccess(req,res,next){
  const configured = process.env.ADMIN_API_KEY;
  if (!configured) return res.status(503).json({ message: 'Admin API is not configured' });
  const supplied = req.get('x-admin-key');
  if (!supplied || supplied !== configured) return res.status(401).json({ message: 'Admin access denied' });
  next();
}
