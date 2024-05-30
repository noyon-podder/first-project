import { z } from 'zod'

const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(16, 'First name cannot be more than 16 characters.')
    .min(1, 'First name is required.')
    .regex(/^[A-Za-z]+$/, 'First name must contain only letters.'),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1, 'Last name is required.')
    .regex(/^[A-Za-z]+$/, 'Last name  contain only letters.'),
})

const createGuardianValidationSchema = z.object({
  fathersName: z.string().min(1, 'Father name is required.'),
  fatherOccupation: z.string().min(1, 'Father occupation is required.'),
  fatherContactNo: z.string().min(1, 'Father contact number is required.'),
  motherName: z.string().min(1, 'Mother name is required.'),
  motherOccupation: z.string().min(1, 'Mother occupation is required.'),
  motherContactNo: z.string().min(1, 'Mother contact number is required.'),
})

// Local Guardian Schema
const createLocalGuardianValidationSchema = z.object({
  name: z.string().min(1, 'Local guardian name is required.'),
  occupation: z.string().min(1, 'Local guardian occupation is required.'),
  contactNo: z.string().min(1, 'Local guardian contact number is required.'),
  address: z.string().min(1, 'Local guardian address is required.'),
})

// Student Schema
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: createUserNameValidationSchema,
      email: z
        .string()
        .email('Email is not valid')
        .min(1, 'Email is required and must be unique.'),
      password: z.string().max(20),
      contactNo: z.string().min(1, 'Contact number is required.'),
      gender: z.enum(['male', 'female', 'other'], {
        required_error: 'Gender is required.',
      }),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      emergencyContactNo: z
        .string()
        .min(1, 'Emergency contact number is required.'),
      dateOfBirth: z.string().min(1, 'Date of birth is required.'),
      presentAddress: z.string().min(1, 'Present address is required.'),
      permanentAddress: z.string().min(1, 'Permanent address is required.'),
      localGuardian: createLocalGuardianValidationSchema,
      guardian: createGuardianValidationSchema,
      profileImage: z.string().optional(),
    }),
  }),
})

// update validation schema start here

const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(16, 'First name cannot be more than 16 characters.')
    .min(1, 'First name is required.')
    .regex(/^[A-Za-z]+$/, 'First name must contain only letters.')
    .optional(),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1, 'Last name is required.')
    .regex(/^[A-Za-z]+$/, 'Last name must contain only letters.')
    .optional(),
})

const updateGuardianValidationSchema = z.object({
  fathersName: z.string().min(1, 'Father name is required.').optional(),
  fatherOccupation: z
    .string()
    .min(1, 'Father occupation is required.')
    .optional(),
  fatherContactNo: z
    .string()
    .min(1, 'Father contact number is required.')
    .optional(),
  motherName: z.string().min(1, 'Mother name is required.').optional(),
  motherOccupation: z
    .string()
    .min(1, 'Mother occupation is required.')
    .optional(),
  motherContactNo: z
    .string()
    .min(1, 'Mother contact number is required.')
    .optional(),
})

// Local Guardian Schema
const updateLocalGuardianValidationSchema = z.object({
  name: z.string().min(1, 'Local guardian name is required.').optional(),
  occupation: z
    .string()
    .min(1, 'Local guardian occupation is required.')
    .optional(),
  contactNo: z
    .string()
    .min(1, 'Local guardian contact number is required.')
    .optional(),
  address: z.string().min(1, 'Local guardian address is required.').optional(),
})

// Student Schema
const updateStudentValidationSchema = z.object({
  body: z
    .object({
      password: z.string().max(20).optional(),
      student: z
        .object({
          name: updateUserNameValidationSchema.optional(),
          email: z
            .string()
            .email('Email is not valid')
            .min(1, 'Email is required and must be unique.')
            .optional(),
          password: z.string().max(20).optional(),
          contactNo: z
            .string()
            .min(1, 'Contact number is required.')
            .optional(),
          gender: z
            .enum(['male', 'female', 'other'], {
              required_error: 'Gender is required.',
            })
            .optional(),
          bloodGroup: z
            .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
            .optional(),
          emergencyContactNo: z
            .string()
            .min(1, 'Emergency contact number is required.')
            .optional(),
          dateOfBirth: z
            .string()
            .min(1, 'Date of birth is required.')
            .optional(),
          presentAddress: z
            .string()
            .min(1, 'Present address is required.')
            .optional(),
          permanentAddress: z
            .string()
            .min(1, 'Permanent address is required.')
            .optional(),
          localGuardian: updateLocalGuardianValidationSchema.optional(),
          guardian: updateGuardianValidationSchema.optional(),
          profileImage: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
})

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
}
