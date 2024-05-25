import express, { Response, Request, Application } from 'express'
import cors from 'cors'
import { StudentsRoutes } from './app/modules/students/students.route'
import { UserRoutes } from './app/modules/user/user.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import notFoundRoute from './app/middlewares/notFound'

const app: Application = express()

//parser
app.use(express.json())
app.use(cors())

// router
app.use('/api/v1/user', UserRoutes)
app.use('/api/v1/student', StudentsRoutes)

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
