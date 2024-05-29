import express from 'express'
import validateRequest from '../../middlewares/validateRequest'

import { AcademicFacultyControllers } from './academicFaculty.controller'
import { academicFacultyValidate } from './academicFaculty.validation'

const router = express.Router()

router.post(
  '/create-academic-faculty',
  validateRequest(academicFacultyValidate.createAcademicFacultyValidateSchema),
  AcademicFacultyControllers.createAcademicFaculty,
)

router.get('/', AcademicFacultyControllers.getAllFaculty)

router.get('/:facultyId', AcademicFacultyControllers.getSingleFaculty)

router.patch(
  '/:facultyId',
  validateRequest(academicFacultyValidate.updateAcademicFacultyValidateSchema),
  AcademicFacultyControllers.updateSingleFaculty,
)

export const AcademicFacultyRoutes = router
