const Post = require('../model/Post.model')
const Video = require('../model/video.modal')

const createPost = async (req, res) => {
    try {
        const user = req.user;

        
        const { description, classroomId } = req.body; // use req.query for classroomId once frontend is ready

        if(!description || !classroomId){
            return res.json({
                success: false,
                message: "Data Missing",
            });
        }

        const newPost = await Post.create({
            description,
            classroomId,
            userId: user._id,
        });

        if (!newPost) {
            return res.status(400).json({
                success: false,
                message: "Failed to create post"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Post created successfully",
            data: newPost
        });

    } catch (e) {
        console.log("Error in createPost controller", e);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const deletePost = async (req, res) => {
    try {
        const user = req.user;
        const { postId } = req.query;

        if (!postId) {
            return res.status(404).json({
                success: false,
                message: "Post ID is required"
            });
        }

        const postData = await Post.deleteOne({ _id: postId, userId: user._id });

        if (!postData.deletedCount) {
            return res.status(404).json({
                success: false,
                message: "Failed to delete post"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Post deleted successfully"
        });

    } catch (e) {
        console.log("Error in deletePost controller", e);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const editPost = async (req, res) => {
    try {
        const user = req.user;
        const { postId ,description} = req.body;

        if (!postId || !description) {
            return res.status(404).json({
                success: false,
                message: "Data is missing"
            });
        }

        const postData = await Post.updateOne({ _id: postId, userId: user._id }, { $set: { description } });

        if (!postData.matchedCount) {
            return res.status(404).json({
                success: false,
                message: "Post not found or you are not the author"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Post updated successfully"
        });

    } catch (e) {
        console.log("Error in editPost controller", e);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const readPosts = async (req, res) => {
    try {
        const { classroomId } = req.query;
        const posts = await Post.find({ classroomId }).populate('userId', 'firstName lastName').sort({ createdAt: -1 });;

        return res.status(200).json({
            success: true,
            message: "Posts found successfully",
            data: posts
        });

    } catch (e) {
        console.log("Error in readPosts controller", e);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const updateVideoDetilas = async(req,res)=>{
    try{

        const { formData ,dbId } = req.body
        await Video.findByIdAndUpdate({_id:dbId},{
            $set:{
                title:formData.videoTitle,
                description:formData.videoDesc,
            }
        })
       
        return res.status(200).json({
            success: true,
            message:"Details Saved",
        })

    }catch(e){

        console.log("Error occured",e)
        return res.json({
            success: false,
            message:"internal Server Error",
        })
    }
}

const getVideos = async(req,res)=>{
    try{

        const { classroomId } = req.query;
        if(!classroomId){
            return res.json({
                success: false,
                message: "Id Missing",
            });
        }
        const response = await Video.find({classroomId:classroomId},{_id:1,title:1,videoId:1,description:1,url:1,userId:1,createdAt:1}).populate('userId', 'firstName lastName').sort({ createdAt: -1 });
       
        return res.status(200).json({
            success: true,
            videos:response
        })

    }catch(e){

        console.log("Error occured",e)
        return res.json({
            success: false,
            message:"internal Server Error",
        })
    }
}

const deleteVideo = async (req, res) => {
    try {
        const user = req.user;
        const { videoId } = req.query;

        if (!videoId) {
            return res.status(404).json({
                success: false,
                message: "Video ID is required"
            });
        }

        const postData = await Video.deleteOne({ _id: videoId, userId: user._id });

        if (!postData.deletedCount) {
            return res.status(404).json({
                success: false,
                message: "Failed to delete Video"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Video deleted successfully"
        });

    } catch (e) {
        console.log("Error in deletePost controller", e);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const getpost = async (req,res) => {
    try{
        const {ID} = req.query;
        if(!ID){
            return res.status(404).json({
                success:false,
                message:"post Id not get it"
            })
        }
        const posts = await Post.find({ _id: ID });
        if(!posts){
            return res.status(404).json({
                success:false,
                message:"post not get it"
            })
        }
        return res.status(200).json({
            success:true,
            data:posts,
        });
    }catch(e){
        console.log("Error in getPost controller",e)

    }
}

const getvideo = async (req,res) => {
    try{
        const {ID} = req.query;
        if(!ID){
            return res.status(404).json({
                success:false,
                message:"video Id not get it"
            })
        }
        const video = await Video.find({ _id: ID });
        if(!video){
            return res.status(404).json({
                success:false,
                message:"video not get it"
            })
        }
        return res.status(200).json({
            success:true,
            data:video,
        });
    }catch(e){
        console.log("Error in getvideo controller",e)

    }
}

const videometadata = async (req,res) => {
    try{
        console.log("reqArrived");
        const {videoID} = req.query;
        if(!videoID){
            return res.status(404).json({
                success:false,
                message:"video Id not get it"
            })
        }
        const video = await Video.find({videoId: videoID });
        if(!video){
            return res.status(404).json({
                success:false,
                message:"video not get it"
            })
        }
        return res.status(200).json({
            success:true,
            data:video,
        });
    }catch(e){
        console.log("Error in getvideo controller",e)

    }
}



module.exports = { createPost , deletePost , readPosts , editPost ,updateVideoDetilas,getVideos,deleteVideo , getpost , getvideo,videometadata}