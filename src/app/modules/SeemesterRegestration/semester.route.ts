import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { SemesterRegistrationValidations } from './semesterRegistration.validation'
import { SemesterRegistrationController } from './semesterRegistration.controller'

const router = express.Router()

router.post(
  '/create-semester',
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
)

router.get('/', SemesterRegistrationController.getAllSemesterRegistrations)

router.get('/:id', SemesterRegistrationController.getSingleSemesterRegistration)

router.get(
  '/:id',
  validateRequest(
    SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.updateSemesterRegistration,
)

export const SemesterRegistrationRoute = router
