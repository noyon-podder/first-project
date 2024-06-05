import express from 'express'
import { UserControllers } from './user.controller'
import { studentValidations } from '../students/students.validation'
import validateRequest from '../../middlewares/validateRequest'
import { facultyValidations } from '../faculty/faculty.validation'

const router = express.Router()

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.crateStudent,
)

router.post(
  '/create-faculty',
  validateRequest(facultyValidations.createFacultyValidationSchema),
  UserControllers.crateFaculty,
)

export const UserRoutes = router
