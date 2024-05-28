import mongoose from 'mongoose'
import { TUser } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'

const userSchema = new mongoose.Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['admin', 'faculty', 'student'],
      required: true,
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

// password hashing use mongoose pre middleware
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.saltRound))

  next()
})

// send empty string when send the data in response
userSchema.post('save', function (doc, next) {
  doc.password = ''

  next()
})

export const User = mongoose.model<TUser>('User', userSchema)
