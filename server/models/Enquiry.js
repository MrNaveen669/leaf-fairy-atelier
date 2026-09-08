import mongoose from 'mongoose';
const schema=new mongoose.Schema({name:{type:String,required:true,trim:true},email:{type:String,required:true,trim:true,lowercase:true},phone:{type:String,required:true,trim:true},space:{type:String,required:true},message:{type:String,required:true},status:{type:String,enum:['new','contacted','closed'],default:'new'}},{timestamps:true});
export default mongoose.model('Enquiry',schema);
