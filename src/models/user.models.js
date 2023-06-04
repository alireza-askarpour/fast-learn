import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
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

UserSchema.index({ fullname: 'text', email: 'text' })

export default mongoose.model('user', UserSchema)
