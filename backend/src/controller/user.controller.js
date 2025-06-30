import { Message } from "../models/message.model.js";
import {User} from "../models/user.model.js";
export const getAllUsers = async (req, res, next) => {
    try {
        const { userId } = await req.auth(); // ✅ use req.auth() as a function
        const users = await User.find({ clerkId: { $ne: userId } });
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

export const getMessages= async(req,res,next) =>{
    try {
        const {myId}= await req.auth();
        const {userId}= req.params;

        const messages=await Message.find({
            $or:[
                {senderId:userId,receiverId:myId},
                {senderId:myId,receiverId:userId},
            ],
        }).sort({createdAt: 1});

        res.status(200).json(messages);
    } catch (error) {
        next(error);
    }
};
