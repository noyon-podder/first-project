import { z } from 'zod'

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Name is string',
      required_error: 'Name is required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic Faculty is string',
      required_error: 'Academic Faculty is required',
    }),
  }),
})

export const AcademicDepartmentValidation = {
  createAcademicDepartmentValidationSchema,
}
