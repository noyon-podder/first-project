import express from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { StudentsRoutes } from '../modules/students/students.route'
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route'
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route'
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route'
import { FacultyRoutes } from '../modules/faculty/faculty.route'
import { AdminRoutes } from '../modules/admin/admin.route'

const router = express.Router()

const moduleRotes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/student',
    route: StudentsRoutes,
  },
  {
    path: '/academic-semester',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculty',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/faculty',
    route: FacultyRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
]

moduleRotes.forEach((route) => router.use(route.path, route.route))

export default router
