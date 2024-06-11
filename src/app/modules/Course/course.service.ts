import QueryBuilder from '../../builder/QueryBuilder'
import { courseSearchableFiled } from './course.constant'
import { TCourse } from './course.interface'
import { Course } from './course.model'

// create course
const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload)

  return result
}

// get all course
const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(courseSearchableFiled)
    .filter()
    .paginate()
    .fields()
  const result = await courseQuery.modelQuery

  return result
}

// get single course
const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  )

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
