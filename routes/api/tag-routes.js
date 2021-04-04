const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll(
    {
      raw: true,
      include: [
        {
          model: Product,
          attributes: ['productName'],
          through: {
            attributes: []
          }
        }
      ]
    }
  )
  .then((tags) => {
    if (!tags) {
      res.status(404).json({ message: 'No tags found' })
      return
    }
    res.status(200).json(tags)
  })
  .catch((err) => {
    res.status(500).json(err)
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findAll({
    where: {
      id: req.params.id
    },
    raw: true,
    include: [
      {
        model: Product,
        attributes: ['productName'],
        through: {
          attributes: []
        }
      }
    ]
  })
  .then((tag) => {
    if (!tag) {
      res.status(404).json({ message: `Tag with ID ${req.params.id} not found`})
      return
    }
    res.status(200).json(tag)
  })
  .catch((err) => {
    res.status(500).json(err)
  })
});

router.post('/', (req, res) => {
  // create a new tag
  const name = req.body.tagName
  Tag
  .create({ tagName: name })
  .then((tag) => {
    if (!tag) {
      res.status(502).json({ message: `Tag not created` })
      return
    }
    res.status(200).json(tag)
  })
  .catch((err) => {
    res.status(500).json(err)
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  const newName = req.body.tagName
  const id = req.params.id
  Tag
  .update(req.body,
    {
      where: {
        id: id
      }
    }
  )
  .then((tag) => {
    if (!tag) {
      res.status(502).json({ message: `Tag with ID ${id} unable to be updated` })
      return
    }
    res.status(200).json({ message: `Tag ID ${id} updated with name "${newName}"` })
  })
  .catch((err) => {
    res.status(500).json(err)
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  const id = req.params.id
  Tag
  .destroy({ where: { id: id } })
  .then((tag) => {
    if (!tag) {
      res.status(404).json({ message: `Tag ID ${id} not found`})
      return
    }
    res.status(200).json({ message: `Tag ID ${id} deleted`})
  })
  .catch((err) => {
    res.status(500).json(err)
  })
});

module.exports = router;
