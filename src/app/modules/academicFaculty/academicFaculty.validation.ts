import { z } from 'zod'

const createAcademicFacultyValidateSchema = z.object({
  body: z.object({
    name: z.string(),
  }),
})

const updateAcademicFacultyValidateSchema = z.object({
  body: z.object({
    name: z.string(),
  }),
})

export const academicFacultyValidate = {
  createAcademicFacultyValidateSchema,
  updateAcademicFacultyValidateSchema,
}
