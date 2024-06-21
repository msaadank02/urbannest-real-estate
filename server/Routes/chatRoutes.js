const express = require('express')
const router = express.Router()
const cors = require('cors')
const { accessChat, fetchChats } = require('../controllers/chatController')
const { verifyToken, authMiddleware } = require('../middlewares/authMiddleware')

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173',
        methods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE']
    })
)

router.post('/access-chat', authMiddleware, accessChat)
router.get('/fetch-chats', authMiddleware, fetchChats)

module.exports = router