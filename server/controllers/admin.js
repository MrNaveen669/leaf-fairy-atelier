import Product from '../models/Product.js';
import Collection from '../models/Collection.js';
import Inventory from '../models/Inventory.js';
import Order from '../models/Order.js';
import Enquiry from '../models/Enquiry.js';
import ContentBlock from '../models/ContentBlock.js';

const normalizeImages=(images=[],fallbackImage='',fallbackAlt='')=>{
  const list=Array.isArray(images)?images.filter(x=>x?.url?.trim()).map((x,index)=>({url:x.url.trim(),alt:x.alt||'',sourceType:x.sourceType==='upload'?'upload':'url',isCover:Boolean(x.isCover),sortOrder:index})):[];
  if(!list.length&&fallbackImage?.trim())list.push({url:fallbackImage.trim(),alt:fallbackAlt||'',sourceType:'url',isCover:true,sortOrder:0});
  if(list.length&&!list.some(x=>x.isCover))list[0].isCover=true;
  let coverSeen=false;for(const item of list){if(item.isCover&&!coverSeen)coverSeen=true;else if(item.isCover)item.isCover=false}
  return list;
};
const productPayload=body=>{const images=normalizeImages(body.images,body.image,body.alt);const cover=images.find(x=>x.isCover)||images[0];return {name:body.name?.trim(),slug:body.slug?.trim(),collectionSlug:body.collectionSlug?.trim(),description:body.description||'',priceRange:body.priceRange||'',image:cover?.url||body.image||'',alt:cover?.alt||body.alt||'',images,dimensions:body.dimensions||'',materials:body.materials||'',care:body.care||'',stylingNotes:body.stylingNotes||'',featured:Boolean(body.featured)}};
export async function dashboard(req,res){const [products,collections,orders,enquiries,lowStock]=await Promise.all([Product.countDocuments(),Collection.countDocuments(),Order.countDocuments(),Enquiry.countDocuments(),Inventory.countDocuments({active:true,stock:{$lte:5}})]);res.json({products,collections,orders,enquiries,lowStock})}
export async function products(req,res){res.json(await Product.find().sort({updatedAt:-1}).lean())}
export async function createProduct(req,res){const data=productPayload(req.body);if(!data.name||!data.slug||!data.collectionSlug)return res.status(400).json({message:'Name, slug and collection are required'});if(await Product.exists({slug:data.slug}))return res.status(409).json({message:'Product slug already exists'});const p=await Product.create(data);res.status(201).json(p.toObject())}
export async function updateProduct(req,res){const current=await Product.findById(req.params.id).lean();if(!current)return res.status(404).json({message:'Product not found'});const data=productPayload({...current,...req.body});if(!data.name||!data.slug||!data.collectionSlug)return res.status(400).json({message:'Name, slug and collection are required'});const duplicate=await Product.exists({_id:{$ne:req.params.id},slug:data.slug});if(duplicate)return res.status(409).json({message:'Product slug already exists'});const p=await Product.findByIdAndUpdate(req.params.id,{$set:data},{new:true,runValidators:true}).lean();res.json(p)}
export async function collections(req,res){res.json(await Collection.find().sort({updatedAt:-1}).lean())}
export async function createCollection(req,res){const {title,slug}=req.body;if(!title?.trim()||!slug?.trim())return res.status(400).json({message:'Title and slug are required'});if(await Collection.exists({slug:slug.trim()}))return res.status(409).json({message:'Collection slug already exists'});const item=await Collection.create({title:title.trim(),slug:slug.trim(),kicker:req.body.kicker||'',summary:req.body.summary||'',heroLine:req.body.heroLine||'',image:req.body.image||'',alt:req.body.alt||''});res.status(201).json(item.toObject())}
export async function updateCollection(req,res){const allowed={};for(const field of ['title','kicker','summary','heroLine','image','alt'])if(req.body[field]!==undefined)allowed[field]=req.body[field];const item=await Collection.findByIdAndUpdate(req.params.id,{$set:allowed},{new:true,runValidators:true}).lean();if(!item)return res.status(404).json({message:'Collection not found'});res.json(item)}
export async function inventory(req,res){res.json(await Inventory.find().populate('product','name collectionSlug image').sort({updatedAt:-1}).lean({virtuals:true}))}
export async function updateInventory(req,res){const allowed={};for(const key of ['price','compareAtPrice','stock','reserved','active'])if(req.body[key]!==undefined)allowed[key]=req.body[key];const item=await Inventory.findByIdAndUpdate(req.params.id,{$set:allowed},{new:true,runValidators:true}).populate('product','name collectionSlug image');if(!item)return res.status(404).json({message:'Inventory item not found'});res.json(item)}
export async function orders(req,res){res.json(await Order.find().sort({createdAt:-1}).lean())}
export async function updateOrder(req,res){const allowed={};if(req.body.status!==undefined)allowed.status=req.body.status;const item=await Order.findByIdAndUpdate(req.params.id,{$set:allowed},{new:true,runValidators:true}).lean();if(!item)return res.status(404).json({message:'Order not found'});res.json(item)}
export async function enquiries(req,res){res.json(await Enquiry.find().sort({createdAt:-1}).lean())}
export async function updateEnquiry(req,res){const allowed={};if(req.body.status!==undefined)allowed.status=req.body.status;const item=await Enquiry.findByIdAndUpdate(req.params.id,{$set:allowed},{new:true,runValidators:true}).lean();if(!item)return res.status(404).json({message:'Enquiry not found'});res.json(item)}
export async function content(req,res){res.json(await ContentBlock.find().sort({section:1,sortOrder:1}).lean())}
export async function saveContent(req,res){const block=await ContentBlock.findOneAndUpdate({key:req.params.key},{$set:{...req.body,key:req.params.key}},{new:true,upsert:true,runValidators:true}).lean();res.json(block)}
export async function archiveContent(req,res){const block=await ContentBlock.findOneAndUpdate({key:req.params.key},{$set:{enabled:false}},{new:true}).lean();if(!block)return res.status(404).json({message:'Content block not found'});res.json(block)}
