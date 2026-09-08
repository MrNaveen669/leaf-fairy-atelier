import Collection from '../models/Collection.js';import Product from '../models/Product.js';
export async function getCollections(req,res){res.json(await Collection.find().sort({slug:1}).lean())}
export async function getCollectionBySlug(req,res){const collection=await Collection.findOne({slug:req.params.slug}).lean();if(!collection)return res.status(404).json({message:'Collection not found'});const products=await Product.find({collectionSlug:collection.slug}).lean();res.json({...collection,products})}
