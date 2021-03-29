const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');
// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  Product.findAll(
    {
      raw: true,
      include: [Category, 'product_tags']
    }
  )
  .then((prods) => {
    if (!prods) {
      res.status(404).json({ message: 'No products found' })
      return
    }
    res.status(200).json(prods)
  })
  .catch((err) => {
    res.status(500).json(err)
  });
})

// get one product
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  const id = req.params.id
  Product.findOne(
      {
        raw: true,
        where: {
          id: id
        },
        include: [Category, 'product_tags']
      }
  )
  .then((prod) => {
    if (!prod) {
      res.status(404).json({ message: `No products found with ID ${id}` })
      return
    }
    res.status(200).json(prod)
  })
  .catch((err) => {
    res.status(500).json(err)
  })
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      categoryId: 2
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (typeof req.body.tagIds === 'array') {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id: tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  Product.destroy(
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then((prod) => {
    if (!prod) {
      res.status(404).json({ message: `Product ID ${req.params.id} not found` })
      return
    }
    res.status(200).json({ message: `Product ID ${req.params.id} deleted`})
  })
  .catch((err) => {
    res.status(500).json(err)
  })
});

module.exports = router;
