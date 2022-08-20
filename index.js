const connectToMongo=require('./db')
const express = require('express')
const cors = require("cors")

connectToMongo()
const app = express()
const port = 5000

app.use(express.json())
app.use(cors())

app.use('/api/auth',require('./routes/auth'))
app.use('/api/Cataloge',require('./routes/CatalogeLists'))
app.use('/api/Cart',require('./routes/Cart'))


app.listen(port, () => {
  console.log(`listening on port ${port}`)
})