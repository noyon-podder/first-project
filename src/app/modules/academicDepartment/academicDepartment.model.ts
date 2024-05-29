import { model, Schema } from 'mongoose'
import { TAcademicDepartment } from './academicDepartment.interface'
import AppError from '../../errors/AppError'

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  { timestamps: true },
)

// check the document already exist throw error
academicDepartmentSchema.pre('save', async function (next) {
  const isExistDepartment = await AcademicDepartment.findOne({
    name: this.name,
  })

  if (isExistDepartment) {
    throw new AppError(404, 'Department already exist!!')
  }
  next()
})

// check the document doesn't exist thrown error
academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery()

  const isDepartmentExist = await AcademicDepartment.findOne(query)

  if (!isDepartmentExist) {
    throw new AppError(404, 'This department not exist')
  }
  next()
})
export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
)
