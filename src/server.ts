import mongoose from 'mongoose'
import app from './app'
import config from './app/config'
import { Server } from 'http'

let server: Server
// connect database
async function main() {
  try {
    mongoose.connection.on('connected', () => {
      console.log('Database Connection Successfully 💕')
    })

    mongoose.connection.on('error', (err) => {
      console.error('Database connection internally Failed: ', err)
    })

    await mongoose.connect(config.database_url as string)

    server = app.listen(config.port, () => {
      console.log(`server running ${config.port}`)
    })
  } catch (err) {
    console.log('Database connection failed: ', err)
    process.exit(1)
  }
}

main()

// handle unhandledRejection error and close the server
process.on('unhandledRejection', () => {
  console.log(`👿 unhandledRejection is detected. Shutting down server 👿`)
  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }
  process.exit(1)
})

// handle uncaughtException error and close the server
process.on('uncaughtException', () => {
  console.log(`👿 uncaughtException is detected. Shutting down server 👿`)

  process.exit(1)
})
