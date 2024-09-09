const User = require('../model/userDetails')
const Class = require('../model/class.model')
const Post = require('../model/Post.model')

const createpost = async(req,res)=>{
    try {
        const user = req.user
        
        if(user.role == 'student')
        {
            return res.status(400).json({
                success:false,
                message:"Authoraization fail"
            })
        }

        const { content , classid } = req.body // here write req.query for classid after complete frontend

        const attachments = req.body?.attachments
        const links = req.body?.links

        const newpost = await Post.create({
            content,
            class:classid,
            author:user._id,
            attachments,
            links
        })

        if(!newpost){
            return res.status(400).json({
                success:false,
                message:"Failed to create post"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Post created successfully",
            data:newpost
        })


    } catch (e) {
        console.log("Error in createpost controller",e)
    }
}

const deletepost = async(req,res)=>{
    try {

        const user = req.user

        const {postId} =req.query

        if(!postId)
        {
            return res.status(404).json({
                success:false,
                message:"Post id not get from the user"
            })
        }

        const postdata =await Post.deleteOne({_id:postId})

        if(!postdata){
            return res.status(404).json({
                success:false,
                message:"Post Data not delete"
            })
        }

        return res.status(200).json({
            success:true,
            message:"post data delete successfully"
        })
    

    } catch (e) {
        console.log("Error in deletepost controller",e)
    }
}

const editpost = async(req,res)=>{
    try {
        const user = req.user
        const {postId} = req.query

        if(!postId){
            return res.status(404).json({
                success:false,
                message:"Post id not get from the user"
            })
        }

        const { content , links , attachments } = req.body
        const postdata = await Post.updateOne({_id:postId,author:user._id},{$set:{content,attachments,links}})

        if(!postdata){
            return res.status(404).json({
                success:false,
                message:"Post Data not update successfully.Either the post does not exist or you are not the author."
            })}

        return res.status(200).json({
            success:true,
            message:"post data updated successfully"
        })
    } catch (e) {
        console.log("Error in editpost controller",e)
    }
}

const readposts = async(req,res)=>{
    try {
        const { classid } = req.body
        const posts = await Post.find({ class: classid })
        console.log("here is",posts)
        return res.status(200).json({
            success: true,
            message:"Posts Found Successfully",
            data:posts
        })

    } catch (e) {
        console.log("Error in readpost controller",e)
    }
}

module.exports = { createpost , editpost , readposts , deletepost }