import express from 'express'
import { AcademicSemesterControllers } from './academicSemester.controller'
import validateRequest from '../../middlewares/validateRequest'
import { academicSemesterValidation } from './academicSemester.validation'

const router = express.Router()

router.post(
  '/create-academic-semester',
  validateRequest(
    academicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
)

router.get('/', AcademicSemesterControllers.getAllSemester)

router.get('/:id', AcademicSemesterControllers.getSingleSemester)

router.patch(
  '/:id',
  validateRequest(
    academicSemesterValidation.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.singleSemesterUpdate,
)

export const AcademicSemesterRoutes = router
