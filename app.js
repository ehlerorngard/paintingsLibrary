const express = require('express')
const express_graphql = require('express-graphql')
const schema = require('./schema/schema.js')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const chalk = require('react-dev-utils/chalk');

dotenv.config()

const app = express()

process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'

// ====== server static ======
app.use(express.static((process.env.NODE_ENV === 'production') ? 'build' : 'public'));

// ====== CORS ======
const uri = (process.env.NODE_ENV === 'production') ? ['https://paintings-library.herokuapp.com'] : ['http://localhost:4000', 'http://localhost:3000', 'http://localhost:4001'];
const whitelist = [...uri, undefined]
const corsOptions = {
  origin: function (origin, callback) {
  	console.log(chalk.yellow('origin'), chalk.cyan(origin))
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))


// ====== mongoose ======
mongoose
	.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log(`mongoose connected to the database ${chalk.green('paintings_library')}`))
	.catch(err => console.log(err))

// ====== GraphQL API ======
app.use('/graphql', express_graphql({
	schema: schema,
	graphiql: true,
	pretty: true,
}))


// ====== start server ======
const server_port = (process.env.NODE_ENV === 'production') ? process.env.PORT : 4000;

app.listen(server_port, () => {
	console.log(`PaintingsLibrary express server listening on port ${server_port}`)
})