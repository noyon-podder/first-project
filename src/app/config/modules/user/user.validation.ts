import { z } from 'zod'

const guardianValidationSchema = z.object({
  fathersName: z.string().min(1, 'Father name is required.'),
  fatherOccupation: z.string().min(1, 'Father occupation is required.'),
  fatherContactNo: z.string().min(1, 'Father contact number is required.'),
  motherName: z.string().min(1, 'Mother name is required.'),
  motherOccupation: z.string().min(1, 'Mother occupation is required.'),
  motherContactNo: z.string().min(1, 'Mother contact number is required.'),
})

// Local Guardian Schema
const localGuardianValidationSchema = z.object({
  name: z.string().min(1, 'Local guardian name is required.'),
  occupation: z.string().min(1, 'Local guardian occupation is required.'),
  contactNo: z.string().min(1, 'Local guardian contact number is required.'),
  address: z.string().min(1, 'Local guardian address is required.'),
})

// Student Schema
const studentValidationSchema = z.object({
  id: z.string().min(1, 'Student ID is required and must be unique.'),
  name: z.object({
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
  }),
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
  localGuardian: localGuardianValidationSchema,
  guardian: guardianValidationSchema,
  profileImage: z.string().optional(),
  isActive: z.enum(['active', 'block']).default('active'),
})

export default studentValidationSchema
