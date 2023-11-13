const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

 

router.get('/', async(req, res) => {
   
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({ message: "tags not found." });
  }
});

router.get('/:id', async(req, res) => {
   
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tagData) {
      res.status(404).json({ message: "id did not match any tag." });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({ message: "tag not found." });
  }
});

router.post('/', async(req, res) => {
 
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json({ message: "failed to create new tag." });
  }
});

router.put('/:id', async(req, res) => {
   
  try {
    const updated = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    !updated[0]
      ? res.status(404).json({ message: "id did not match any tag." })
      : res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "tag update failed," });
  }
});

router.delete('/:id', async(req, res) => {
  
  try {
    const deleted = await Tag.destroy({ where: { id: req.params.id } });
    !deleted
      ? res.status(404).json({ message: "id did not match any tag." })
      : res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json({ message: "tag deletion failed." });
  }
});

module.exports = router;
