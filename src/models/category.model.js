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

CategorySchema.virtual('subcategories', {
  ref: 'category',
  localField: '_id',
  foreignField: 'parent',
})

function autoPopulate(next) {
  this.populate([{ path: 'subcategories', select: { id: 0, __v: 0 } }])
  next()
}

CategorySchema.pre('findOne', autoPopulate).pre('find', autoPopulate)

export default mongoose.model('category', CategorySchema)
