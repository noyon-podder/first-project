import express, { Response, Request, Application } from 'express'
import cors from 'cors'

import globalErrorHandler from './app/middlewares/globalErrorHandler'
import notFoundRoute from './app/middlewares/notFound'
import router from './app/routes'

const app: Application = express()

//parser
app.use(express.json())
app.use(cors())

// all router call here from routes folder
app.use('/api/v1', router)

// check routing
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello Developer!!',
  })
})

// global error handler
app.use(globalErrorHandler)

// not found route
app.use(notFoundRoute)
export default app
