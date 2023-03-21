import mongoose from 'mongoose'

const RoleSchema = new mongoose.Schema(
  {
    title: { type: String, require: true, unique: true },
    description: { type: String, default: '' },
    permissions: { type: [mongoose.Types.ObjectId], ref: 'permission', default: [] },
  },
  {
    versionKey: false,
    toJSON: {
      virtuals: true,
    },
  }
)

export default mongoose.Schema('role', RoleSchema)
