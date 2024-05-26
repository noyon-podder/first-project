import express from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { StudentsRoutes } from '../modules/students/students.route'

const router = express.Router()

const moduleRotes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/student',
    route: StudentsRoutes,
  },
]

moduleRotes.forEach((route) => router.use(route.path, route.route))

export default router
