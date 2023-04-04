const router = require('express').Router();
const { Post, User } = require('../../models');

// GET all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ['userName'] }]
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a post by ID
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['userName'] }]
    });
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a new post
router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      post_content: req.body.content,
      user_id: req.session.user_id,
    });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE a post by ID
router.put('/:id', async (req, res) => {
  console.log("edit this post!");
  try {
    console.log("there you go!");
    const updatedPost = await Post.update(
      {
        title: req.body.title,
        post_content: req.body.content,
      },
      {
        where: {
          id: req.params.id
        }
      }
    );
    if (!updatedPost[0]) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a post by ID
router.delete('/:id', async (req, res) => {
  console.log("delete!");
  try {
    console.log("its deleted")
    const deletedPost = await Post.destroy({
        where: {
        id: req.params.id}
    });
    res.status(201).json(deletedPost);
    if (!deletedPost) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;