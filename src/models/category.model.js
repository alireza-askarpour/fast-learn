import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    value: { type: String, required: true },
    subcategories: [
      {
        name: { type: String, required: true },
        value: { type: String, required: true },
        disabled: { type: Boolean, default: false },
      },
    ],
  },
  {
    versionKey: false,
  }
)

export default mongoose.model('category', CategorySchema)
