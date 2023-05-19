import mongoose from 'mongoose'
import { nanoid, alphabetNumber, alphabetLowerCaseLetters } from '../config/nanoid.config.js'

const UserSchema = new mongoose.Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      default: 'student',
      enum: ['student', 'writer', 'admin'],
    },
    avater: { type: String, default: undefined },
    courses: { type: [mongoose.Types.ObjectId], default: [] },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

UserSchema.index({ first_name: 'text', last_name: 'text', email: 'text' })

export default mongoose.model('user', UserSchema)
