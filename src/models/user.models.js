import mongoose from 'mongoose'
import { nanoid } from 'nanoid'
import {
  alphabetLowerCaseLetters,
  alphabetNumber,
} from '../config/nanoid.config.js'

const UserModel = new mongoose.Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    username: {
      type: String,
      lowercase: true,
      default: nanoid(alphabetNumber + alphabetLowerCaseLetters, 10),
    },
    mobile: { type: String, required: true },
    otp: {
      type: Object,
      default: {
        code: 0,
        expiresIn: 0,
      },
    },
    role: {
      type: String,
      required: true,
      default: 'student',
      enum: ['student', 'writer', 'admin'],
    },
    avater: { type: String, default: '' },
    courses: { type: [mongoose.Types.ObjectId], default: [] },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model(UserModel, 'user')
