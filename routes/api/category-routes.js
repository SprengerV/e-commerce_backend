const router = require('express').Router();
const { Category, Product } = require('../../models');
const { capitalize } = require('../../lib')
// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll(
    {
      raw: true,
      include: [
        {
          model: Product,
          attributes: ['productName']
        }
      ]
    }
  )
  .then((cats) => {
    if (!cats) {
      res.status(404).json({ message: 'No categories found' })
      return
    }
    res.status(200).json(cats)
  })
  .catch((err) => {
    res.status(500).json(err)
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category
  .findAll({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['productName']
    }
  })
  .then((cats) => {
    if (!cats) {
      res.status(404).json({ message: `No category with ID ${req.params.id} found`})
      return
    }
    res.status(200).json(cats)
  })
  .catch((err) => {
    res.status(500).json(err)
  })
});

router.post('/', (req, res) => {
  // create a new category
  const name = capitalize(req.body.categoryName)
  Category
  .create({ categoryName: name })
  .then((newCat) => {
    if (!newCat) {
      res.status(502).json({ message: `Failed to create category ${name}` })
      return
    }
    res.status(200).json(newCat)
  })
  .catch((err) => {
    res.status(500).json(err)
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  const id = req.params.id
  const name = capitalize(req.body.categoryName)
  Category.update(
    {
      categoryName: name
    },
    {
      where: {
        id: id
      },
    }
  )
  .then((cat) => {
    if (!cat) {
      res.status(502).json({ message: `Failed to update category ID ${id}` })
      return
    }
    res.status(200).json({ message: `Category ID ${id} updated with name ${name}`})
  })
  .catch((err) => {
    res.status(500).json(err)
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  const id = req.params.id
  Category.destroy(
    {
      where: {
        id: id
      }
    }
  )
  .then((cat) => {
    if (!cat) {
      res.status(404).json({ message: `No category with ID ${id} found` })
      return
    }
    res.status(200).json({ message: `Category ID ${id} deleted`})
  })
  .catch((err) => {
    res.status(500).json(err)
  })
});

module.exports = router;
