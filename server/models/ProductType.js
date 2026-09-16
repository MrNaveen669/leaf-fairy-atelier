import mongoose from 'mongoose';
const schema=new mongoose.Schema({
  name:{type:String,required:true,trim:true},
  slug:{type:String,required:true,unique:true,index:true,trim:true},
  description:{type:String,default:''},
  enabled:{type:Boolean,default:true,index:true},
  sortOrder:{type:Number,default:0},
},{timestamps:true});
export default mongoose.model('ProductType',schema);
