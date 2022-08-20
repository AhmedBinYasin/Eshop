const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  Email: {
    type: String,
    default : "Unsigned"
  },
  CatagoryList: [
    {
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
          quantity: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
});

const Cart = mongoose.model("cart", cartSchema);
module.exports = Cart;
