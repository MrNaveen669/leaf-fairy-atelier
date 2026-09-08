import mongoose from 'mongoose';
const schema=new mongoose.Schema({quote:{type:String,required:true},name:String,role:String,approved:{type:Boolean,default:true}},{timestamps:true});
export default mongoose.model('Testimonial',schema);
