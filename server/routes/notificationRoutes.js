const express = require('express');
const router = express.Router();
const {
    getAllNotification,
    markNotificationAsRead,
    deleteNotification,
    clearAllNotifications,
    markAllAsRead
} = require('../controllers/notificationController');

router.get('/notifications/:userId', getAllNotification);
router.patch('/notifications/:notificationId', markNotificationAsRead);
router.delete('/notifications/:notificationId',deleteNotification);
router.put('/mark-all-as-read/:userId', markAllAsRead);
router.delete('/clear-all/:userId', clearAllNotifications);

module.exports = router;