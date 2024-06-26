import mongoose from 'mongoose'
import {
  TStudent,
  Guardian,
  LocalGuardian,
  StudentModel,
  // IStudentMethod,
} from './students.interface'
import validator from 'validator'

const guardianSchema = new mongoose.Schema<Guardian>({
  fathersName: {
    type: String,
    required: [true, 'Father name is required.'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father occupation is required.'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father contact number is required.'],
  },
  motherName: {
    type: String,
    required: [true, 'Mother name is required.'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation is required.'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother contact number is required.'],
  },
})

const localGuardianSchema = new mongoose.Schema<LocalGuardian>({
  name: {
    type: String,
    required: [true, 'Local guardian name is required.'],
  },
  occupation: {
    type: String,
    required: [true, 'Local guardian occupation is required.'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local guardian contact number is required.'],
  },
  address: {
    type: String,
    required: [true, 'Local guardian address is required.'],
  },
})

const studentSchema = new mongoose.Schema<
  TStudent,
  StudentModel
  // IStudentMethod
>(
  {
    id: {
      type: String,
      required: [true, 'Student ID is required and must be unique.'],
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      unique: true,
    },
    name: {
      firstName: {
        type: String,
        required: [true, 'First name is required.'],
        trim: true,
        maxlength: [16, 'First name can not be more than 20 charcter'],
        validate: {
          validator: (value: string) => validator.isAlpha(value),
          message: '{VALUE} is not defined',
        },
      },
      middleName: { type: String },
      lastName: { type: String, required: [true, 'Last name is required.'] },
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required and must be unique.'],
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not valid email',
      },
    },

    contactNo: {
      type: String,
      required: [true, 'Contact number is required.'],
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: [true, 'Gender is required.'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required.'],
    },
    dateOfBirth: {
      type: String,
      required: [true, 'Date of birth is required.'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required.'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required.'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local guardian information is required.'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian information is required.'],
    },
    profileImage: { type: String },
    admissionSemester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    academicDepartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })

  next()
})
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })

  next()
})
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })

  next()
})

// for creating static method

studentSchema.statics.isUserExists = async function (id) {
  const existingUser = Student.findOne({ id })

  return existingUser
}

export const Student = mongoose.model<TStudent, StudentModel>(
  'Student',
  studentSchema,
)
