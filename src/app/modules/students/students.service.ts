import mongoose from 'mongoose'
import { Student } from './students.model'
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { User } from '../user/user.model'
import { TStudent } from './students.interface'

// get all students into db
const getAllStudents = async (query: Record<string, unknown>) => {
  // copy query for remove the field for filtering operation
  const queryFields = { ...query }

  let searchTerm = ''

  if (query?.searchTerm) {
    searchTerm = query.searchTerm as string
  }
  // partial match in this document for search
  const studentSearchableField = [
    'email',
    'name.firstName',
    'name.lastName',
    'presentAddress',
  ]

  // {email: {$regex: query.searchTerm, $options: 'i'}}
  const searchQuery = Student.find({
    $or: studentSearchableField.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  })

  // filtering
  const removeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields']

  removeFields.forEach((el) => delete queryFields[el])

  const filterQuery = searchQuery
    .find(queryFields)
    .populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: { path: 'academicFaculty' },
    })

  // sorting part start here
  let sort = '-createdAt'

  if (query.sort) {
    sort = query.sort as string
  }

  const sortQuery = filterQuery.sort(sort)

  let page = 1
  let limit = 1
  let skip = 0

  if (query.limit) {
    limit = Number(query.limit) as number
  }

  if (query.page) {
    page = Number(query.page)
    skip = (page - 1) * limit
  }

  const paginateQuery = sortQuery.skip(skip)

  const limitQuery = paginateQuery.limit(limit)

  // field limiting
  let fields = '-__v'

  if (query.fields) {
    fields = (query.fields as string).split(',').join(' ')
  }

  const fieldsQuery = await limitQuery.select(fields)

  return fieldsQuery
}

// get single student into db and populate there
const getSingleStudent = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: { path: 'academicFaculty' },
    })

  return result
}

// update student into db
const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  }

  //  update non-primitive data help with loop
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value
    }
  }

  // update non-primitive data help with loop
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value
    }
  }

  // update non-primitive data help with loop
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  })
  return result
}

// delete student with two collection and use to  => Transaction Rollback
const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Student not deleted')
    }

    const deleteUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'User is not delete')
    }

    await session.commitTransaction()
    await session.endSession()
    return deletedStudent
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error('Failed to Delete Student')
  }
}

export const StudentsService = {
  getAllStudents,
  getSingleStudent,
  deleteStudentFromDB,
  updateStudentIntoDB,
}
