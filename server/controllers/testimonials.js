import Testimonial from '../models/Testimonial.js';
export async function getTestimonials(req,res){res.json(await Testimonial.find({approved:true}).lean())}
