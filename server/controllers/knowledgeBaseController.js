const Article = require('../models/knowledgeBase');

// Generate unique slug from title (basic example)
const generateSlug = (title) => {
  const timestamp = Date.now().toString().slice(-4);
  return title.toLowerCase().replace(/[\s\W-]+/g, '-') + '-' + timestamp;
};

// GET all articles
const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find({});
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ error: 'Server error while fetching articles' });
  }
};

// GET article by slug
const getArticleBySlug = async (req, res) => {
  const { slug } = req.params;

  try {
    const article = await Article.findOne({ slug });

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.status(200).json(article);
  } catch (err) {
    res.status(500).json({ error: 'Server error while fetching the article' });
  }
};

// CREATE new article
const createArticle = async (req, res) => {
  const { title, category, content, tags, author, isPublished, description } = req.body;

  if (!title || !category || !content || !author?.name) {
    return res.status(400).json({ error: 'Please fill in all required fields.' });
  }

  const slug = generateSlug(title);

  try {
    const newArticle = new Article({
      title,
      slug,
      category,
      author,
      content,
      tags,
      isPublished,
      description
    });
    
    await newArticle.save();

    res.status(201).json('Created article successfully');
  } catch (err) {
    console.error('Create article error:', err);
    res.status(500).json({ error: 'Server error while creating article' });
  }
};

// UPDATE article
const updateArticle = async (req, res) => {
  const { slug } = req.params;
  const updateFields = req.body;

  try {
    const article = await Article.findOne({ slug });

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    updateFields.updatedAt = new Date();

    await Article.findOneAndUpdate({ slug }, updateFields, { new: true });
    res.status(200).json('Article updated successfully');
  } catch (err) {
    console.error('Update article error:', err);
    res.status(500).json({ error: 'Server error while updating article' });
  }
};

// DELETE article
const deleteArticle = async (req, res) => {
  const { slug } = req.params;

  try {
    const deleted = await Article.findOneAndDelete({ slug });

    if (!deleted) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error while deleting article' });
  }
};

// INCREMENT views
const incrementViews = async (req, res) => {
  const { slug } = req.params;

  try {
    const updated = await Article.findOneAndUpdate(
      { slug },
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Server error while incrementing views' });
  }
};

// RATE article
const rateArticle = async (req, res) => {
  const { slug } = req.params;
  const { rating } = req.body;

  if (typeof rating !== 'number' || rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Invalid rating value (must be 1–5)' });
  }

  try {
    const article = await Article.findOne({ slug });

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    const newCount = article.ratings.count + 1;
    const newAverage = ((article.ratings.average * article.ratings.count) + rating) / newCount;

    article.ratings.count = newCount;
    article.ratings.average = parseFloat(newAverage.toFixed(1));
    await article.save();

    res.status(200).json(article.ratings);
  } catch (err) {
    console.error('Rate article error:', err);
    res.status(500).json({ error: 'Server error while rating article' });
  }
};

module.exports = {
  getAllArticles,
  getArticleBySlug,
  createArticle,
  updateArticle,
  deleteArticle,
  incrementViews,
  rateArticle
};
