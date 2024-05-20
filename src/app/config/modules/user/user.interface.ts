import { Model } from 'mongoose'

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

export type IStudent = {
  id: string
  name: Username
  email: string
  password: string
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
  isActive: 'active' | 'block'
}

// creating static method
export interface StudentModel extends Model<IStudent> {
  isUserExists(id: string): Promise<IStudent>
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
