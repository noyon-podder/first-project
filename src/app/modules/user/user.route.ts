import express from 'express'
import { UserControllers } from './user.controller'
import { studentValidations } from '../students/students.validation'
import validateRequest from '../../middlewares/validateRequest'
import { facultyValidations } from '../faculty/faculty.validation'
import { createAdminValidationSchema } from '../admin/admin.validation'

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

router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
);

export const UserRoutes = router
