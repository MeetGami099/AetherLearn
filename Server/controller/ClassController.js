const User = require('../model/userDetails')
const Class = require('../model/class.model')

function generateRandomCode(length = 6) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}

async function generateUniqueClassCode(length = 6) {
    let classCode;
    let isUnique = false;

    while (!isUnique) {
        classCode = generateRandomCode(length);

        const existingClass = await Class.findOne({ classCode });
        if (!existingClass) {
            isUnique = true; 
        }
    }

    return classCode;
}

const createClass = async (req, res) => {
    try {
        const user = req.user

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }

        const { name, description, subject } = req.body

        if (!(name || subject)) {
            return res.status(404).json({
                success: false,
                message: "provide all information properly"
            })
        }

        const classCode = generateUniqueClassCode()

        const newclass =await Class.create({
            name,
            description,
            subject,
            classCode,
            creator:user._id,
        })

        if(!newclass)
        {
            return res.status(500).json({
                success:flase,
                message:"Class not create"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Class created successfully",
            data:newclass
        })


    } catch (e) {
        console.log("Error in Class Controller:", e)
    }
}

const editclass = async (req,res) => {
    try {
        const user = req.user;
        const classid = req.body || req.query 
        const userclass = await Class.findById(classid)

        if(!userclass)
        {
            return res.status(404).json({
                success:false,
                message:"class not found"
            })
        }


        if(user._id != userclass.creator){  // here maybe error can accured for tostring in id
            return res.status(300).json({
                success:false,
                message:"you are not valid author to change anything"
            })
        }

        const { name , description , subject } = req.body

        //update in class model

        userclass.name=name
        userclass.description=description
        userclass.subject=subject
        await userclass.save({validateBeforeSave:false})


    } catch (e) {
        console.log("error in editclass controller:",e)
    }
}

const getclass = async(req,res)=>{
    try {
        const classid = req.query

        if(!classid){
            return res.status(404).json({
                success:false,message:"class id not get from req"
            })
        }

        const classdetail = await Class.findById(classid).select('-assignments -updatedAt -__v ')

        if(!classdetail){
            return res.status(404).json({
                success:false,message:"class not get successfully"
            })
        }

        return res.status(200).json({
            success:true,
            message:"class found successfully",
            classdetail
        })

    } catch (error) {
        console.log("error in getclass detail controller",e)
    }
}

const joinclass = async(req,res)=>{
    try {

        const user = req.user

        if(!user){
            return res.status(500).json({
                success:false,
                message:"user not found"
            })
        }

        const classcode = req.body

        if(!classcode){
            return res.status(404).json({
                success:flase,
                message:"Classcode not found"
            })
        }

        const classdetail = await Class.findOne({classCode:classcode})
        classdetail.students.push(user._id)
        await classdetail.save()

        //await Class.findOneAndUpdate({classCode:classcode},{$push:{students:user._id}})

        user.joinclass.push(classdetail._id)
        await user.save()

        return res.status(200).json({
            success:true,
            message:"class joined successfully",
        })

    } catch (e) {
        console.log("Error in joinclass controller",e)
    }
}

const leaveclass = async (req,res)=>{
    try {
        const user = req.user;

        const {classId} = req.body

        const classData = await Class.findOne({_id:classId})

        if(!classData){
            return res.status(404).json({
                success:false,
                message:"class not found"
                })
        }

        if (classData.creator.toString() === user._id) {
            // If creator is leaving, delete the class
            await Class.findByIdAndDelete(classId);

            // Remove class reference from all students
            await User.updateMany(
                { joinedclass: classId },
                { $pull: { joinedclass: classId } }
            );

            // Remove related posts
            await Post.deleteMany({ class: classId });
            return res.status(200).json({ message: 'Class and related data deleted successfully' });
        } else {
            // If a student is leaving, remove them from the class
            await Class.findByIdAndUpdate(
                classId,
                { $pull: { students: user._id } }
            );

            // Remove class from student's joined classes
            await User.findByIdAndUpdate(
                user._id,
                { $pull: { joinedclass: classId } }
            );

            return res.status(200).json({ message: 'Left class successfully' });
        }

    } catch (e) {
        console.log("error in leave class controller",e)
    }
}

module.exports = { createClass , editclass , getclass , joinclass , leaveclass }