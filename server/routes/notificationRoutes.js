const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

const {
    getAllNotification,
    markNotificationAsRead,
    deleteNotification,
    clearAllNotifications,
    markAllAsRead
} = require('../controllers/notificationController');

router.get('/notifications/:userId', verifyToken, getAllNotification);
router.patch('/notifications/:notificationId', verifyToken, markNotificationAsRead);
router.delete('/notifications/:notificationId', verifyToken, deleteNotification);
router.put('/notifications/mark-all-as-read/:userId', verifyToken, markAllAsRead);
router.delete('/notifications/clear-all/:userId', verifyToken, clearAllNotifications);

module.exports = router;