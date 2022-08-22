const express = require('express')
const Cart = require('../models/Cart')
const Orders = require('../models/Orders')
const router = express.Router()
const { body, validationResult } = require('express-validator')

//Route:1 Add to Cart
router.post('/Add', [], async (req, res) => {
  //return errors if found
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  let catagoryFound = false
  let foundIndexCatagory
  let itemFound = false
  let foundIndexItem
  //check if Email exist
  let cart = await Cart.findOne({ Email: req.body.Email })
  if (!cart) {
    Cart.create({
      Email: req.body.Email,
      CatagoryList: req.body.CatagoryList,
    })
    return res.json({ Message: 'Item Added' })
  } else {
    for (let i = 0; i < cart.CatagoryList.length; i++) {
      if (
        cart.CatagoryList[i].CatagoryName ==
        req.body.CatagoryList[0].CatagoryName
      ) {
        catagoryFound = true
        foundIndexCatagory = i
      }
    }
    if (!catagoryFound) {
      cart.CatagoryList.push(req.body.CatagoryList[0])
      cart.save(function (err) {
        if (err) {
          console.error('ERROR!')
        }
      })
      return res.json({ Message: 'Item Added' })
    } else {
      for (
        let i = 0;
        i < cart.CatagoryList[foundIndexCatagory].ItemList.length;
        i++
      ) {
        if (
          cart.CatagoryList[foundIndexCatagory].ItemList[i].Name ==
          req.body.CatagoryList[0].ItemList[0].Name
        ) {
          itemFound = true
          foundIndexItem = i
        }
      }
      if (!itemFound) {
        cart.CatagoryList[foundIndexCatagory].ItemList.push(
          req.body.CatagoryList[0].ItemList[0],
        )
        cart.save(function (err) {
          if (err) {
            console.error('ERROR!')
          }
        })
        return res.json({ Message: 'Item Added' })
      } else {
        cart.CatagoryList[foundIndexCatagory].ItemList[
          foundIndexItem
        ].quantity =
          parseInt(
            cart.CatagoryList[foundIndexCatagory].ItemList[foundIndexItem]
              .quantity,
          ) + parseInt(req.body.CatagoryList[0].ItemList[0].quantity)
        cart.save(function (err) {
          if (err) {
            console.error('ERROR!')
          }
        })
        return res.json({ Message: 'Item Added' })
      }
    }
  }
})

//Route:2 Remove from Cart
router.post('/Remove', [], async (req, res) => {
  //return errors if found
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  let catagoryFound = false
  let foundIndexCatagory
  let itemFound = false
  let foundIndexItem
  //check if Email exist
  let cart = await Cart.findOne({ Email: req.body.Email })
  if (!cart) {
  } else {
    for (let i = 0; i < cart.CatagoryList.length; i++) {
      if (
        cart.CatagoryList[i].CatagoryName ==
        req.body.CatagoryList[0].CatagoryName
      ) {
        catagoryFound = true
        foundIndexCatagory = i
      }
    }
    if (!catagoryFound) {
    } else {
      for (
        let i = 0;
        i < cart.CatagoryList[foundIndexCatagory].ItemList.length;
        i++
      ) {
        if (
          cart.CatagoryList[foundIndexCatagory].ItemList[i].Name ==
          req.body.CatagoryList[0].ItemList[0].Name
        ) {
          itemFound = true
          foundIndexItem = i
        }
      }
      if (!itemFound) {
      } else {
        if (
          parseInt(
            cart.CatagoryList[foundIndexCatagory].ItemList[foundIndexItem]
              .quantity,
          ) -
            parseInt(req.body.CatagoryList[0].ItemList[0].quantity) >
          0
        ) {
          cart.CatagoryList[foundIndexCatagory].ItemList[
            foundIndexItem
          ].quantity =
            parseInt(
              cart.CatagoryList[foundIndexCatagory].ItemList[foundIndexItem]
                .quantity,
            ) - parseInt(req.body.CatagoryList[0].ItemList[0].quantity)
          cart.save(function (err) {
            if (err) {
              console.error('ERROR!')
            }
          })
          return res.json({ Message: 'Item Removed' })
        } else {
          if (cart.CatagoryList[foundIndexCatagory].ItemList.length > 1) {
            cart.CatagoryList[foundIndexCatagory].ItemList.splice(
              cart.CatagoryList[foundIndexCatagory].ItemList.indexOf(
                req.body.CatagoryList[0].ItemList[0],
              ),
              1,
            )

            cart.save(function (err) {
              if (err) {
                console.error('ERROR!')
              }
            })
            return res.json({ Message: 'Item Removed' })
          } else {
            if (cart.CatagoryList.length > 1) {
              cart.CatagoryList.splice(
                cart.CatagoryList.indexOf(req.body.CatagoryList[0]),
                1,
              )
              cart.save(function (err) {
                if (err) {
                  console.error('ERROR!')
                }
              })
              return res.json({ Message: 'Item Removed' })
            } else {
              await Cart.findByIdAndDelete(cart._id)
              return res.json({ Message: 'Item Removed' })
            }
          }
        }
      }
    }
  }
})

//Route:3 View Cart
router.post('/ViewCart', [], async (req, res) => {
  //return errors if found
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  //return Catalog
  let cart = await Cart.findOne({ Email: req.body.Email })
  return res.json(cart)
})

//Route:4 PlaceOrder
router.post('/PlaceOrder', [], async (req, res) => {
  //return errors if found
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  //Create Order
  await Orders.create({
    Email: req.body.Email,
    Billing: {
      Name: req.body.Billing.Name,
      Address: req.body.Billing.Address,
      Zip: req.body.Billing.Zip,
      OrderPrice: req.body.Billing.OrderPrice,
    },
    ItemList: req.body.ItemList,
  })
  await Cart.deleteOne({ Email: req.body.Email })

  return res.json({ Message: 'Order Placed' })
})

//Route:3 View Orders
router.post('/ViewOrders', [], async (req, res) => {
  //return errors if found
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  //return Catalog
  let orders = await Orders.find()
  return res.json(orders)
})

module.exports = router
