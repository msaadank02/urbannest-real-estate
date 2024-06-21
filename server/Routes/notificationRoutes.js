const express = require('express')
const router = express.Router()
const cors = require('cors')
const { authMiddleware } = require('../middlewares/authMiddleware')
const { enterChat, leaveChat, getNotifications, leaveAllChats } = require('../controllers/notificationController')

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173',
        methods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE']
    })
)

router.post('/enter-chat', authMiddleware, enterChat)
router.post('/leave-chat', authMiddleware, leaveChat)
router.get('/get-notification', authMiddleware, getNotifications)
router.put('/leave-all-chats', authMiddleware, leaveAllChats)

module.exports = router