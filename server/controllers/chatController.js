const asynchandler = require('express-async-handler')
const Chat = require('../models/chatModel');
const jwt = require("jsonwebtoken");
const User = require('../models/user');

const accessChat = asynchandler(async(req, res) => {
    const { userId } = req.body;
    const { token } = req.cookies;

    console.log(userId)

    if(!token){
        res.json({error: "Please Login to chat with the seller"})
    }
    if(!userId){
        console.log("User id not available")
        res.sendStatus(400)
    }

    let loggedInUser;
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
            if(err) throw err;
            const data = await User.findOne({_id: user._id}).exec()
            if(!data) return res.json({error: "No user found"})
            
            loggedInUser = data._id
            loggedInUser = loggedInUser.toString()
            console.log(loggedInUser)
            if(loggedInUser === userId){
                return res.json({error: "You can not contact with yourself :)"})
            }
        })
    
    var isChat = await Chat.find({
        $and: [
        { users: { $elemMatch: { $eq: loggedInUser } } },
        { users: { $elemMatch: { $eq: userId } } },
        ],
    })
        .populate("users", "-password")
        .populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "username avatar email",
    });
    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [loggedInUser, userId],
        };

        try {
            const existingChat = await Chat.findOne({
                users: { $all: [loggedInUser, userId] }, // Both users should be in the chat
            });

            if (existingChat) {
                return res.json(existingChat);
            }
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                "users",
                "-password"
            );
            res.status(200).json(FullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
})

const fetchChats = asynchandler(async(req, res) => {
    try {
        Chat.find({users: {$elemMatch: {$eq: req.body._id}}})
            .populate("users", "-password")
            .populate("latestMessage")
            .sort({updatedAt: -1})
            .then(async (result) => {
                result = await User.populate(result, {
                    path: "latestMessage",
                    select: "name avatar email"
                })
                res.status(200).send(result)
            });
    } catch (error) {
        res.status(400);
        throw new Error(error.message)
    }
})

module.exports = {
    accessChat,
    fetchChats,
}