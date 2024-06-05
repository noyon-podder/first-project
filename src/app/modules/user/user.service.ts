import mongoose from 'mongoose'
import config from '../../config'

import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TStudent } from '../students/students.interface'
import { Student } from '../students/students.model'
import { TUser } from './user.interface'
import { User } from './user.model'
import { generatedFacultyId, generateStudentId } from './user.utils'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import { TFaculty } from '../faculty/faculty.interface'
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model'
import { Faculty } from '../faculty/faculty.model'

const createStudentIntoDb = async (password: string, studentData: TStudent) => {
  // create a new user
  const userData: Partial<TUser> = {}

  // if password not given, use default password
  userData.password = password || (config.defaultPassword as string)

  //   set user role
  userData.role = 'student'

  //find academic semester by id
  const admissionSemester = await AcademicSemester.findById(
    studentData.admissionSemester,
  )

  if (!admissionSemester) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admission semester not found')
  }

  // set manually ID

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    //set  generated id
    userData.id = await generateStudentId(admissionSemester)

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }) // array

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    // set id , _id as user
    studentData.id = newUser[0].id
    studentData.user = newUser[0]._id //reference _id

    // create a student (transaction-2)

    const newStudent = await Student.create([studentData], { session })

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }

    await session.commitTransaction()
    await session.endSession()

    return newStudent
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error('Failed to create student')
  }
}

// create faculty from db

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // faculty data create for faculty role
  const facultyData: Partial<TUser> = {}

  // set password or default password is save
  facultyData.password = password || (config.defaultPassword as string)

  // set role
  facultyData.role = 'faculty'

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  )

  if (!academicDepartment) {
    throw new AppError(404, 'Academic Department Not Found!')
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    // get faculty id
    facultyData.id = await generatedFacultyId()

    const newUser = await User.create([facultyData], { session })

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Create User Failed')
    }

    // set id and usr role
    payload.id = newUser[0].id
    payload.user = newUser[0]._id

    const newFaculty = await Faculty.create([payload], { session })

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to faculty create')
    }

    await session.commitTransaction()
    await session.endSession()

    return newFaculty
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error('Faculty Create Failed!!')
  }
}

export const UserServices = {
  createStudentIntoDb,
  createFacultyIntoDB,
}
