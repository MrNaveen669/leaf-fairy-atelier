import mongoose from 'mongoose';

const adminUserSchema=new mongoose.Schema({
  name:{type:String,required:true,trim:true},
  email:{type:String,required:true,trim:true,lowercase:true,unique:true,index:true},
  passwordHash:{type:String,required:true,select:false},
  passwordSalt:{type:String,required:true,select:false},
  role:{type:String,enum:['owner','admin','editor'],default:'admin'},
  active:{type:Boolean,default:true,index:true},
  sessionVersion:{type:Number,default:0},
  lastLoginAt:{type:Date,default:null}
},{timestamps:true});

export default mongoose.model('AdminUser',adminUserSchema);
