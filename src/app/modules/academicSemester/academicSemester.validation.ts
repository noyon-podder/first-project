import { z } from 'zod'
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './academicSemester.constant'

const validationMonthSchema = z.enum([...Months] as [string, ...string[]])

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string, ...string[]]),
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]]),
    year: z.date(),
    startMonth: validationMonthSchema,
    endMonth: validationMonthSchema,
  }),
})

export const academicSemesterValidation = {
  createAcademicSemesterValidationSchema,
}
