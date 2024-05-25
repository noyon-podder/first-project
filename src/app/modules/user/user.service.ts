import config from '../../config'
import { TStudent } from '../students/students.interface'
import { Student } from '../students/students.model'
import { TUser } from './user.interface'
import { User } from './user.model'

const createStudentIntoDb = async (password: string, studentData: TStudent) => {
  // create a new user
  const userData: Partial<TUser> = {}

  // if password not given, use default password
  userData.password = password || (config.defaultPassword as string)

  //   set user role
  userData.role = 'student'

  // set manually ID
  userData.id = '000123'

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
