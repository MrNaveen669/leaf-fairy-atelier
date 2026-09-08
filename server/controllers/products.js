import Product from '../models/Product.js';
export async function getProducts(req,res){const filter=req.query.collection?{collectionSlug:req.query.collection}:{};res.json(await Product.find(filter).lean())}
export async function getProductById(req,res){const p=await Product.findById(req.params.id).lean();if(!p)return res.status(404).json({message:'Product not found'});res.json(p)}
