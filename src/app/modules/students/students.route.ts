import express from 'express'
import { StudentsController } from './students.controller'

const router = express.Router()

router.get('/', StudentsController.getAllStudents)
router.get('/:studentId', StudentsController.getSingleStudent)

router.delete('/:studentId', StudentsController.deleteStudent)

export const StudentsRoutes = router
