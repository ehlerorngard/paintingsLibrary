const express = require('express')
const express_graphql = require('express-graphql')
const schema = require('./schema/schema.js')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const chalk = require('react-dev-utils/chalk');
const triggerEvent = require('./monitoring/monitor.js')
const getFQDN = require('get-fqdn')

dotenv.config()

const app = express()

process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'

// ====== serve static ======
app.use(express.static((process.env.NODE_ENV === 'production') ? 'build' : 'public'))

// ====== CORS ======
const fqdn = async () => {
  try {
    return await getFQDN()
  }
  catch(err) {
    console.log(err)
  }
}
process.env.HOST = (process.env.NODE_ENV === 'production') ? fqdn() : 'localhost:' + require('os').hostname()

const host = (process.env.NODE_ENV === 'production') ? 'https://paintings-library.herokuapp.com' : require('os').hostname()
const uri = (process.env.NODE_ENV === 'production') ? ['https://paintings-library.herokuapp.com'] : ['http://localhost:4000', 'http://localhost:3000', 'http://localhost:4001'];
const whitelist = [...uri, undefined]
const corsOptions = {
  origin: function (origin, callback) {
    process.env.ORIGIN = origin
  	console.log(chalk.yellow('origin'), chalk.cyan(origin))
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      triggerEvent({
        name: 'unpermittedRequestOrigin', 
        message: `Request made from an unpermitted origin: ${origin}`, 
        kind: 'Access Denied',
        source: process.env.HOST,
        component: 'server'
      })
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

app.listen(server_port, (err) => {
	console.log(`PaintingsLibrary express server listening on port ${server_port}`)
  if (err) {
    console.log(err, app.address())
  }
})