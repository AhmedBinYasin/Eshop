const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator')

//Route:1 create a user
router.post(
  '/CreateUser',
  [
    body('Name', 'Enter a valid name').isLength({ min: 3 }),
    body('Email', 'Enter a valid email').isEmail(),
    body('Pasword', 'Pasword must have 5 or more characters').isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //return errors if found
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    //check if Email exist
    let user = User.findOne({ Email: req.body.Email }).then((user) => {
      if (user !== null) {
        return res.status(400).json({ error: 'Email already exist' })
      } else {
        User.create({
          Name: req.body.Name,
          Email: req.body.Email,
          Pasword: req.body.Pasword,
        })
        return res.json({
          Name: req.body.Name,
          Role: 'user',
          Email: req.body.Email,
        })
      }
    })
  },
)

//Route:2 auth a user
router.post(
  '/Login',
  [
    body('Email', 'Enter a valid email').isEmail(),
    body('Pasword', 'Pasword cannot be blank').exists(),
  ],
  async (req, res) => {
    //return errors if found
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { email, Pasword } = req.body
    try {
      let user = await User.findOne({ Email: req.body.Email })
      if (!user) {
        return res
          .status(400)
          .json({ error: 'Enter correct Login Credintials' })
      }
      if (Pasword != user.Pasword) {
        return res
          .status(400)
          .json({ error: 'Enter correct Login Credintials' })
      }
      const Data = {
        user: {
          Name: user.Name,
          Role: user.Role,
          Email: user.Email,
        },
      }
      return res.json(Data)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: 'server error' })
    }
  },
)

module.exports = router
