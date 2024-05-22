const express = require('express')
const router = express.Router()
const cors = require('cors')
const { sendMessage, getAllMessages } = require('../controllers/messageController')
const { verifyToken } = require('../middlewares/authMiddleware')

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173',
        methods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE']
    })
)

router.post('/send-message', verifyToken, sendMessage);
router.get('/get-messages/:chatId', verifyToken, getAllMessages);

module.exports = router