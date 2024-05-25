import express, { Response, Request, Application } from 'express'
import cors from 'cors'
import { StudentsRoutes } from './app/modules/students/students.route'
import { UserRoutes } from './app/modules/user/user.route'

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
export default app
