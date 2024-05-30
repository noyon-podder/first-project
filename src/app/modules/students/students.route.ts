import express from 'express'
import { StudentsController } from './students.controller'
import validateRequest from '../../middlewares/validateRequest'
import { studentValidations } from './students.validation'

const router = express.Router()

router.get('/', StudentsController.getAllStudents)
router.get('/:studentId', StudentsController.getSingleStudent)

router.patch(
  '/:studentId',
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentsController.updateStudent,
)

router.delete('/:studentId', StudentsController.deleteStudent)

export const StudentsRoutes = router
