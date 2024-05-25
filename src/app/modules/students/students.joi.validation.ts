import Joi from 'joi'

// Guardian Schema
const guardianSchema = Joi.object({
  fathersName: Joi.string().required().messages({
    'any.required': 'Father name is required.',
  }),
  fatherOccupation: Joi.string().required().messages({
    'any.required': 'Father occupation is required.',
  }),
  fatherContactNo: Joi.string().required().messages({
    'any.required': 'Father contact number is required.',
  }),
  motherName: Joi.string().required().messages({
    'any.required': 'Mother name is required.',
  }),
  motherOccupation: Joi.string().required().messages({
    'any.required': 'Mother occupation is required.',
  }),
  motherContactNo: Joi.string().required().messages({
    'any.required': 'Mother contact number is required.',
  }),
})

// Local Guardian Schema
const localGuardianSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Local guardian name is required.',
  }),
  occupation: Joi.string().required().messages({
    'any.required': 'Local guardian occupation is required.',
  }),
  contactNo: Joi.string().required().messages({
    'any.required': 'Local guardian contact number is required.',
  }),
  address: Joi.string().required().messages({
    'any.required': 'Local guardian address is required.',
  }),
})

// Student Schema
const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'any.required': 'Student ID is required and must be unique.',
  }),
  name: Joi.object({
    firstName: Joi.string()
      .max(16)
      .trim()
      .required()
      .messages({
        'any.required': 'First name is required.',
        'string.max': 'First name cannot be more than 16 characters.',
        'string.empty': 'First name is not defined',
      })
      .pattern(/^[A-Za-z]+$/, 'letters'),
    middleName: Joi.string().allow(null, ''),
    lastName: Joi.string().required().messages({
      'any.required': 'Last name is required.',
    }),
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required and must be unique.',
    'string.email': 'Email is not valid',
  }),
  contactNo: Joi.string().required().messages({
    'any.required': 'Contact number is required.',
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.required': 'Gender is required.',
  }),
  bloodGroup: Joi.string().valid(
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
  ),
  emergencyContactNo: Joi.string().required().messages({
    'any.required': 'Emergency contact number is required.',
  }),
  dateOfBirth: Joi.date().required().messages({
    'any.required': 'Date of birth is required.',
  }),
  presentAddress: Joi.string().required().messages({
    'any.required': 'Present address is required.',
  }),
  permanentAddress: Joi.string().required().messages({
    'any.required': 'Permanent address is required.',
  }),
  localGuardian: localGuardianSchema.required().messages({
    'any.required': 'Local guardian information is required.',
  }),
  guardian: guardianSchema.required().messages({
    'any.required': 'Guardian information is required.',
  }),
  profileImage: Joi.string().uri(),
  isActive: Joi.string().valid('active', 'inactive'),
})

export default studentValidationSchema
