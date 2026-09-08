import mongoose from 'mongoose';
const schema=new mongoose.Schema({collectionSlug:{type:String,required:true,index:true},name:{type:String,required:true},description:String,priceRange:String,image:String,alt:String},{timestamps:true});
export default mongoose.model('Product',schema);
