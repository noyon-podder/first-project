import express from 'express'
import { StudentsController } from './students.controller'

const router = express.Router()

router.get('/', StudentsController.getAllStudents)
router.get('/:id', StudentsController.getSingleStudent)

router.delete('/:id', StudentsController.deleteStudent)

export const StudentsRoutes = router
