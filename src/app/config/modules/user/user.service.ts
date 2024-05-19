import { IStudent } from './user.interface'
import { Student } from './user.model'

const createStudentIntoDB = async (studentData: IStudent) => {
  // const result = await Student.create(student) //built in static method

  const student = new Student(studentData)

  if (await student.isUserExists(studentData.id)) {
    throw new Error('User already exists!!')
  }

  const result = await student.save()

  return result
}

const getAllStudents = async () => {
  const result = await Student.find({})

  return result
}

const getSingleStudent = async (id: string) => {
  const result = await Student.find({ id })

  return result
}

export const UserService = {
  createStudentIntoDB,
  getAllStudents,
  getSingleStudent,
}
