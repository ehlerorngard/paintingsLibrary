const express = require('express')
const express_graphql = require('express-graphql')
const schema = require('./schema/schema.js')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()

const app = express()

// ====== CORS ======
const uri = (process.env.NODE_ENV === 'production') ? process.env.PRODUCTION_URI : process.env.DEVELOPMENT_URI;
const whitelist = [uri, ]
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))

console.log('mongo...', process.env.MONGO_DB_URI)
// ====== mongoose ======
mongoose
	.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('mongoose connected to the database \"paintings_library\"'))
	.catch(err => console.log(err))

app.use('/graphql', express_graphql({
	schema: schema,  // in ES6 can just be schema since names are the same
	graphiql: true,
	pretty: true,
}))

// ====== start server ======
app.listen(4000, () => {
	console.log('PaintingsLibrary express server listening on port 4000')
})