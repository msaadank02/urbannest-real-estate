const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({
    chatName: { type: String, trim: true },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    },
    lastRead: {
        type: Map,
        of: Date, // Maps user ID to the timestamp of last read message
    },
    activeUsers: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
},
{timestamps: true}
)

const Chat = mongoose.model("Chat", chatSchema)
module.exports = Chat