import {Router} from 'express';import {getTestimonials} from '../controllers/testimonials.js';const r=Router();r.get('/',getTestimonials);export default r;
