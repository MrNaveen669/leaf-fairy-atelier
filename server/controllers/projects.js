import Project from '../models/Project.js';
export async function getProjects(req,res){const filter=req.query.category?{category:req.query.category}:{};res.json(await Project.find(filter).lean())}
