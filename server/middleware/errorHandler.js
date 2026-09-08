export function notFound(req,res,next){const err=new Error(`Not found: ${req.originalUrl}`);err.status=404;next(err)}
export function errorHandler(err,req,res,next){console.error(err);res.status(err.status||500).json({message:err.message||'Server error'})}
