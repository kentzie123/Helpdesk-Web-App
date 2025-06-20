const express = require('express');
const router = express.Router();
const {
    getAllNotification,
    markNotificationAsRead,
    deleteNotification
} = require('../controllers/notificationController');

router.get('/notifications/:userId', getAllNotification);
router.patch('/notifications/:notificationId', markNotificationAsRead);
router.delete('/notifications/:notificationId',deleteNotification);

module.exports = router;