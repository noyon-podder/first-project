import config from '../../config'

import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TStudent } from '../students/students.interface'
import { Student } from '../students/students.model'
import { TUser } from './user.interface'
import { User } from './user.model'
import { generateStudentId } from './user.utils'

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
  userData.id = await generateStudentId(admissionSemester)

  //   create a user
  const newUser = await User.create(userData)

  //create a student
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id // embedding id
    studentData.user = newUser._id // referencing id

    const newStudent = await Student.create(studentData)

    return newStudent
  }

  return newUser
}

export const UserServices = {
  createStudentIntoDb,
}
