const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll(
      {
        raw: true,
        include: ['tagged_products']
      }
    )
    if (!tags) {
      res.status(404).json({ message: 'No tags found' })
      return
    }
    res.status(200).json(tags)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, 
      {
        raw: true,
        include: ['tagged_products']
      }
    )
    if (!tag) {
      res.status(404).json({ message: `Tag with ID ${req.params.id} not found`})
      return
    }
    res.status(200).json(tag)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const name = req.body.tagName
    const tag = await Tag.create({ tagName: name })
    if (!tag) {
      res.status(502).json({ message: `Tag "${name}" not created` })
      return
    }
    res.status(200).json({ message: `Tag "${name}" created` })
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const newName = req.body.tagName
    const id = req.params.id
    const tag = await Tag.update(
      {
        tagName: newName
      },
      {
        where: {
          id: id
        }
      }
    )
    if (tag === 0) {
      res.status(502).json({ message: `Tag with ID ${id} unable to be updated` })
      return
    }
    res.status(200).json({ message: `Tag ID ${id} updated with name "${name}"` })
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const id = req.params.id
    const tag = await Tag.destroy({ where: { id: id } })
    if (!tag) {
      res.status(404).json({ message: `Tag ID ${id} not found`})
      return
    }
    res.status(200).json({ message: `Tag ID ${id} deleted`})
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
