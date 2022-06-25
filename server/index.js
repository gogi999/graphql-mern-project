import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import colors from 'colors'
import { graphqlHTTP } from 'express-graphql'
import schema from './schema/schema.js'
import connectDB from './config/db.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

// Connect to database
connectDB()

app.use(cors())

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  }),
)

app.listen(port, console.log(`Server running on port ${port}...`))
