import mongoose from 'mongoose';
const schema=new mongoose.Schema({title:{type:String,required:true},category:{type:String,enum:['Residential','Hospitality','Commercial'],required:true,index:true},location:String,scope:String,detail:String,image:String,alt:String},{timestamps:true});
export default mongoose.model('Project',schema);
