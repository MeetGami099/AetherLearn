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

const creatClass = async (req, res) => {
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
            teacher:user._id,
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

module.exports = { creatClass }