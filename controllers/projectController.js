const projects = require('../models/projectModels')

// add project
exports.addProjectController = async (req,res)=>{
    console.log("Inside addProjectController");
    const userId = req.userId
    console.log(req.body);
    console.log(userId);
    console.log(req.file);

    const {title,languages,overview,github,website} = req.body
    const projectImage = req.file.filename
    try{
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json("Projects Already exists.... Please upload another!!!")
        }else{
            const newProject = new projects({
                title,languages,overview,github,website,projectImage,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
            
        }

    }catch(err){
  res.status(406).json(err)
}
}
    

    



// get home projects - gusest user
exports.getHomeProjectsController = async (req,res)=>{
    console.log("Inside getHomeProjectsController");
    try{
        const allHomeProjects = await projects.find().limit(3)
        res.status(200).json(allHomeProjects)
    }catch(err){
        res.status(401).json(err)
    }
    
}

// get user projects - authorized user
exports.getUserProjectsController = async (req,res)=>{
    console.log("Inside getHomeProjectsController");
    const userId = req.userId
    try{
        const allUserProjects = await projects.find({userId})
        res.status(200).json(allUserProjects)
    }catch(err){
        res.status(401).json(err)
    }
    
}
// get all projects - authorized user
exports.getAllProjectsController = async (req,res)=>{
    console.log("Inside getHomeProjectsController");
    // to get query parameter from url req.query
    const searchKey = req.query.search
    // const query ={
    //     languages:{
    //         $regex:searchKey,$options:"i"
    //     }
    // }
   
    try{
        const allProjects = await projects.find({
            languages:{
            $regex:searchKey,$options:"i"
        }
    })
        res.status(200).json(allProjects)
    }catch(err){
        res.status(401).json(err)
    }
    
}

// edit project- use findByidAnd Update in model
exports.editProjectController = async(req,res)=>{
console.log("Inside editProjectController");
// 
const {id}=req.params
// 
const{title,languages,overview,github,website,projectImage}= req.body
// 
const reUploadImageFileName = req.file?req.file.filename:projectImage
// 
const userId = req.userId
console.log(id,title,languages,overview,github,website,reUploadImageFileName,userId);
try{
    const updatedProject = await projects.findByIdAndUpdate({_id:id},{
        title,languages,overview,github,website,projectImage:reUploadImageFileName,userId
    },{new:true})
    await updatedProject.save()
    res.status(200).json(updatedProject)
}catch(err){
    res.status(401).json(err)
}


}

