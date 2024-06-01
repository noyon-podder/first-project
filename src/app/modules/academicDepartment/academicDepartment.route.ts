import express from 'express'

import validateRequest from '../../middlewares/validateRequest'
import { AcademicDepartmentValidation } from './academicDepartment.validate'
import { AcademicDepartmentControllers } from './academicDepartment.controller'

const router = express.Router()

router.post(
  '/create-academic-department',
  // validateRequest(
  //   AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  // ),
  AcademicDepartmentControllers.createAcademicDepartment,
)

router.get('/', AcademicDepartmentControllers.getAllDepartment)

router.get('/:departmentId', AcademicDepartmentControllers.getSingleDepartment)

router.patch(
  '/:departmentId',
  AcademicDepartmentControllers.updateSingleDepartment,
)
export const AcademicDepartmentRoutes = router
