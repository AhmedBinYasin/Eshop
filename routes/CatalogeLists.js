const express = require("express");
const Catalogue = require("../models/CatalogeItems")
const router = express.Router();
const { body, validationResult } = require('express-validator');


//Route:1 Get Catalog
router.post('/ViewCatalog',[
],async (req,res)=>{
    //return errors if found
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(Catalogue)
    //return Catalog
    let catalog = await Catalogue.find()
    return res.json(catalog);
})



module.exports=router