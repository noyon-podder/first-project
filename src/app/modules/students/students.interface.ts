import { AcademicDepartment } from './../academicDepartment/academicDepartment.model'
import { Model, Types } from 'mongoose'

export type Username = {
  firstName: string
  middleName?: string
  lastName: string
}

export type Guardian = {
  fathersName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
}

export type LocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}

export type TStudent = {
  id: string
  user: Types.ObjectId
  name: Username
  email: string
  contactNo: string
  gender: 'male' | 'female' | 'other'
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  emergencyContactNo: string
  dateOfBirth: string
  presentAddress: string
  permanentAddress: string
  guardian: Guardian
  localGuardian: LocalGuardian
  profileImage?: string
  admissionSemester: Types.ObjectId
  isDeleted: boolean
  academicDepartment: Types.ObjectId
}

// creating static method
export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent>
}

// for creating instance

// export type IStudentMethod = {
//   isUserExists(id: string): Promise<IStudent | null>
// }

// export type StudentModel = Model<
//   IStudent,
//   Record<string, never>,
//   IStudentMethod
// >
