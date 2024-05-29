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

export const AcademicFacultyRoutes = router
