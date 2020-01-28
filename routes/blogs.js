const express = require("express");
const router = express.Router();
const { User, Tag, Blog } = require("../sequelize");

// find blogs by tag
router.get("/:tag/tag", (req, res) => {
  Blog.findAll({
    include: [{ model: Tag, where: { name: req.params.tag } }]
  }).then(blogs => res.json(blogs));
});

// find blogs belonging to one user or all blogs
router.get("/:userId?", (req, res) => {
  let query;
  if (req.params.userId) {
    query = Blog.findAll({
      include: [
        { model: User, where: { id: req.params.userId } },
        { model: Tag }
      ]
    });
  } else {
    query = Blog.findAll({ include: [Tag, User] });
  }
  return query.then(blogs => res.json(blogs));
});

router.post("/", (req, res) => {
  const body = req.body;
  // either find a tag with name or create a new one
  const tags = body.tags.map(tag =>
    Tag.findOrCreate({
      where: { name: tag.name },
      defaults: { name: tag.name }
    }).spread((tag, created) => tag)
  );
  User.findById(body.userId)
    .then(() => Blog.create(body))
    .then(blog =>
      Promise.all(tags)
        .then(storedTags => blog.addTags(storedTags))
        .then(() => blog)
    )
    .then(blog =>
      Blog.findOne({ where: { id: blog.id }, include: [User, Tag] })
    )
    .then(blogWithAssociations => res.json(blogWithAssociations))
    .catch(err =>
      res
        .status(400)
        .json({ err: `User with id = [${body.userId}] doesn\'t exist.` })
    );
});

module.exports = router;
