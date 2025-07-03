const express = require('express');
const router = express.Router();

const {
    createArticleRating,
    getUserArticleRating
} = require('../controllers/articleRatingController');


router.post('/article-ratings', createArticleRating);
router.get('/article-ratings/:articleId/:userID', getUserArticleRating);

module.exports = router;
