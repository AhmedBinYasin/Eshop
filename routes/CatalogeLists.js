const express = require('express')
const Catalogue = require('../models/CatalogeItems')
const router = express.Router()
const { body, validationResult } = require('express-validator')

//Route:1 Get Catalog
router.post('/ViewCatalog', [], async (req, res) => {
  //return errors if found
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  console.log(Catalogue)
  //return Catalog
  let catalog = await Catalogue.find()
  return res.json(catalog)
})

//Route:1 Delete Catalogue Item
router.post('/DeleteItem', [], async (req, res) => {
  //return errors if found
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  let catalog = await Catalogue.findOne({ CatagoryName: req.body.CatagoryName })
  catalog.ItemList.splice(catalog.ItemList.indexOf(req.body.Id),1)
  catalog.save(function (err) {
    if (err) {
      console.error('ERROR!')
    }
  })
  return res.json('Sucessfull')
})

module.exports = router
