import express from 'express'
import { FacultyControllers } from './faculty.controller'
import validateRequest from '../../middlewares/validateRequest'
import { facultyValidations } from './faculty.validation'

const router = express.Router()

router.get('/', FacultyControllers.getAllFaculties)

router.get('/:id', FacultyControllers.getSingFaculty)

router.patch(
  '/:id',
  validateRequest(facultyValidations.updateFacultyValidationSchema),
  FacultyControllers.singleFacultyUpdated,
)

router.delete('/:id', FacultyControllers.deleteFaculty)

export const FacultyRoutes = router
