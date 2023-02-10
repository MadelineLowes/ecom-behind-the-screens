const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// get all categories
router.get('/', (req, res) => {
  Category.findAll({
    include: [
      {
        model: Product,
      }
    ]
  })
  .then((categories) => res.status(200).json(categories))
  .catch((err) => res.status(500).json(err));
});

// get one category by id
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
      }
    ]
  })
    .then((category) => {
      if (!category) {
        res.status(404).json({ message: 'No category with that id found!' });
        return;
      }
      res.status(200).json(category);
    })
    .catch((err) => res.status(500).json(err));
});

// create a new category
router.post('/', (req, res) => {
  Category.create(req.body)
  .then((category) => res.status(200).json(category))
  .catch((err) => res.status(400).json(err));
});

// update a category by id
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => res.status(200).json(category))
    .catch((err) => res.status(400).json(err));
});

// delete a category by id
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((category) => {
      if (!category) {
        res.status(404).json({ message: 'No category with that id found!' });
        return;
      }
      res.status(200).json(category)
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
