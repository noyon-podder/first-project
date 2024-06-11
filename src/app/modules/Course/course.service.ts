import { TCourse } from './course.interface'
import { Course } from './course.model'

// create course
const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload)

  return result
}

// get all course
const getAllCourseFromDB = async () => {
  const result = await Course.find()

  return result
}

// get single course
const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id)

  return result
}

// delete a course from db
const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  )
  return result
}

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
}
