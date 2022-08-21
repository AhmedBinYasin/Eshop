const mongoose = require('mongoose')
const { Schema } = mongoose

const orderSchema = new Schema({
  Email: {
    type: String,
    required: true,
  },
  Billing: {
    Name: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
    Zip: {
      type: String,
      required: true,
    },
  },
  ItemList: [
    {
      Id: {
        type: String,
        required: true,
      },
      Name: {
        type: String,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      },
    },
  ],
})

const Order = mongoose.model('order', orderSchema)
module.exports = Order
