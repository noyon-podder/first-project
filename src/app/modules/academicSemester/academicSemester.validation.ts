import { z } from 'zod'

const validationMonthSchema = z.enum([
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
])

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum(['Autumn', 'Summer', 'Fall']),
    code: z.enum(['01', '02', '03']),
    year: z.date(),
    startMonth: validationMonthSchema,
    endMonth: validationMonthSchema,
  }),
})

export const academicSemesterValidation = {
  createAcademicSemesterValidationSchema,
}
