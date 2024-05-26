import express from 'express'
import { UserControllers } from './user.controller'

import { studentValidations } from '../students/students.validation'
import validateRequest from '../../middlewares/validateRequest'

const router = express.Router()

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.crateStudent,
)

export const UserRoutes = router
