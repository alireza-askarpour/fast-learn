import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    value: { type: String, required: true },
    disabled: { type: Boolean, default: false },
    parent: { type: mongoose.Types.ObjectId, default: undefined, ref: 'category' },
  },
  {
    id: false,
    toJSON: {
      versionKey: false,
      virtuals: true,
    },
  }
)

export default mongoose.model('category', CategorySchema)
