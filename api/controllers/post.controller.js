import POST from "../models/post.model.js";

export const test = (req,res) =>{
    res.json({
        message: 'Post router working successfully.'
    });
};


export const dropPost = async(req, res, next) =>{
    const { username, avatar, description, comment} = req.body; 

    
    
    const postProblem = new POST({ username, avatar, description, comment});
    
    /* if(req.file){
     postProblem.avatar = req.file.path   
    } */
    
    try{
        await postProblem.save();
        res.status(201).json({message: 'Dropped the post successfully!'});
    }catch(error){
        next(error);
    } 
}