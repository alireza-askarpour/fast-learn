import mongoose from 'mongoose'
import { nanoid, alphabetNumber, alphabetLowerCaseLetters } from '../config/nanoid.config.js'

const UserModel = new mongoose.Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    username: {
      type: String,
      lowercase: true,
      default: nanoid(alphabetNumber + alphabetLowerCaseLetters, 10),
      unique: true,
    },
    mobile: { type: String, required: true, unique: true },
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

export default mongoose.model('user', UserModel)
