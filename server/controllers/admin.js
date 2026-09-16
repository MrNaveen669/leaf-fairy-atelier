import Product from '../models/Product.js';
import Collection from '../models/Collection.js';
import Inventory from '../models/Inventory.js';
import Order from '../models/Order.js';
import Enquiry from '../models/Enquiry.js';
import ContentBlock from '../models/ContentBlock.js';

export async function dashboard(req,res){
  const [products,collections,orders,enquiries,lowStock] = await Promise.all([
    Product.countDocuments(), Collection.countDocuments(), Order.countDocuments(), Enquiry.countDocuments(), Inventory.countDocuments({ active:true, stock:{ $lte:5 } }),
  ]);
  res.json({ products, collections, orders, enquiries, lowStock });
}
export async function products(req,res){res.json(await Product.find().sort({updatedAt:-1}).lean())}
export async function updateProduct(req,res){const allowed={};for(const field of ['name','description','priceRange','featured','slug','collectionSlug','image','alt','dimensions','materials','care','stylingNotes'])if(req.body[field]!==undefined)allowed[field]=req.body[field];const p=await Product.findByIdAndUpdate(req.params.id,{ $set:allowed },{new:true,runValidators:true}).lean();if(!p)return res.status(404).json({message:'Product not found'});res.json(p)}
export async function collections(req,res){res.json(await Collection.find().sort({updatedAt:-1}).lean())}
export async function updateCollection(req,res){const allowed={};for(const field of ['title','kicker','summary','heroLine','image','alt'])if(req.body[field]!==undefined)allowed[field]=req.body[field];const item=await Collection.findByIdAndUpdate(req.params.id,{ $set:allowed },{new:true,runValidators:true}).lean();if(!item)return res.status(404).json({message:'Collection not found'});res.json(item)}
export async function inventory(req,res){res.json(await Inventory.find().populate('product','name collectionSlug image').sort({updatedAt:-1}).lean({virtuals:true}))}
export async function updateInventory(req,res){const allowed={};for(const key of ['price','compareAtPrice','stock','reserved','active'])if(req.body[key]!==undefined)allowed[key]=req.body[key];const item=await Inventory.findByIdAndUpdate(req.params.id,{ $set:allowed },{new:true,runValidators:true}).populate('product','name collectionSlug image');if(!item)return res.status(404).json({message:'Inventory item not found'});res.json(item)}
export async function orders(req,res){res.json(await Order.find().sort({createdAt:-1}).lean())}
export async function updateOrder(req,res){const allowed={};if(req.body.status!==undefined)allowed.status=req.body.status;const item=await Order.findByIdAndUpdate(req.params.id,{ $set:allowed },{new:true,runValidators:true}).lean();if(!item)return res.status(404).json({message:'Order not found'});res.json(item)}
export async function enquiries(req,res){res.json(await Enquiry.find().sort({createdAt:-1}).lean())}
export async function updateEnquiry(req,res){const allowed={};if(req.body.status!==undefined)allowed.status=req.body.status;const item=await Enquiry.findByIdAndUpdate(req.params.id,{ $set:allowed },{new:true,runValidators:true}).lean();if(!item)return res.status(404).json({message:'Enquiry not found'});res.json(item)}
export async function content(req,res){res.json(await ContentBlock.find().sort({section:1,sortOrder:1}).lean())}
export async function saveContent(req,res){const block=await ContentBlock.findOneAndUpdate({key:req.params.key},{ $set:{...req.body,key:req.params.key} },{new:true,upsert:true,runValidators:true}).lean();res.json(block)}
