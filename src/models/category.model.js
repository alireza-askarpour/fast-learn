import mongoose from 'mongoose'
const { model, Schema } = mongoose

const CategorySchema = new Schema(
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

export default model('category', CategorySchema)
