import mongoose from 'mongoose';
const schema=new mongoose.Schema({slug:{type:String,required:true,unique:true,index:true},title:{type:String,required:true},kicker:String,summary:String,heroLine:String,image:String,alt:String,enabled:{type:Boolean,default:true,index:true},sortOrder:{type:Number,default:0}},{timestamps:true});
export default mongoose.model('Collection',schema);
