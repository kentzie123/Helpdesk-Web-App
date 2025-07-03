const express = require('express');
const router = express.Router();
const {
    createArticleView
} = require('../controllers/articleViewsController');


// router.get('/article-views/:userID/:article_id', checkAlreadyViewed);

router.post('/article-views', createArticleView);

module.exports = router;
