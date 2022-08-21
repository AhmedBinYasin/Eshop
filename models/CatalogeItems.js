const mongoose = require('mongoose')
const { Schema } = mongoose

const catalogeSchema = new Schema({
  CatagoryName: {
    type: String,
    required: true,
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
      img: {
        type: String,
        required: true,
      },
    },
  ],
})

const Cataloge = mongoose.model('cataloge', catalogeSchema)
module.exports = Cataloge
