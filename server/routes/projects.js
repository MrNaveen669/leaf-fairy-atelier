import {Router} from 'express';import {getProjects} from '../controllers/projects.js';const r=Router();r.get('/',getProjects);export default r;
