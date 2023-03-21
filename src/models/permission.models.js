import mongoose from 'mongoose'

const PermissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
  },
  {
    versionKey: false,
    toJSON: {
      virtuals: true,
    },
  }
)

export default mongoose.model('permission', PermissionSchema)
