import Enquiry from '../models/Enquiry.js';
export async function createEnquiry(req,res){const enquiry=await Enquiry.create(req.validatedBody);res.status(201).json({message:'Enquiry received',id:enquiry._id})}
