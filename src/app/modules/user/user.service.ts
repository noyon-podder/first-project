import mongoose from 'mongoose'
import config from '../../config'

import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TStudent } from '../students/students.interface'
import { Student } from '../students/students.model'
import { TUser } from './user.interface'
import { User } from './user.model'
import { generateStudentId } from './user.utils'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'

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

export const UserServices = {
  createStudentIntoDb,
}
