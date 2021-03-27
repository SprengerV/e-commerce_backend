const router = require('express').Router();
const { Category, Product } = require('../../models');
const { capitalize } = require('../../lib')
// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const cats = await Category.findAll(
      {
        raw: true,
        include: [Product]
      }
    )
    if (!cats) {
      res.status(404).json({ message: 'No categories found' })
      return
    }
    res.status(200).json(cats)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const cats = await Category.findByPk(req.params.id)
    if (!cats) {
      res.status(404).json({ message: 'No matching categories found'})
      return
    }
    res.status(200).json(cats)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const name = capitalize(req.body.categoryName)
    const newCat = await Category.create({ categoryName: name })
    if (!newCat) {
      res.status(502).json({ message: 'Failed to create category' })
      return
    }
    res.status(200).json(newCat)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const name = capitalize(req.body.categoryName)
    const cat = await Category.update(
      {
        categoryName: name
      },
      {
        where: {
          id: req.params.id
        },
      }
    )
    if (!cat) {
      res.status(502).json({ message: 'Failed to update category' })
      return
    }
    res.status(200).json({ message: `Category ID ${req.params.id} updated with name ${name}`})
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const cat = await Category.destroy(
      {
        where: {
          id: req.params.id
        }
      }
    )
    if (!cat) {
      res.status(404).json({ message: 'No category with that ID found' })
      return
    }
    res.status(200).json({ message: `Category ID ${req.params.id} deleted`})
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
