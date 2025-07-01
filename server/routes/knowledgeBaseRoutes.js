const express = require('express');
const router = express.Router();
const {
  getAllArticles,
  getArticleBySlug,
  createArticle,
  updateArticle,
  deleteArticle,
  incrementViews,
  rateArticle
} = require('../controllers/knowledgeBaseController');

router.get('/knowledge-base', getAllArticles);
router.get('/knowledge-base/:slug', getArticleBySlug);
router.post('/knowledge-base', createArticle);
router.put('/knowledge-base/:slug', updateArticle);
router.delete('/knowledge-base/:slug', deleteArticle);
router.post('/knowledge-base/:slug/views', incrementViews);
router.post('/knowledge-base/:slug/rate', rateArticle);

module.exports = router;
