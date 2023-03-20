import mongoose from 'mongoose'

const BlogSchema = mongoose.Schema(
  {
    title: { type: String, required: true, min: 3, max: 255 },
    description: { type: String, required: true, min: 3, max: 255 },
    content: { type: String, required: true },
    author: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
    thumbnail: { type: String, default: '', required: true },
    slug: { type: String, required: true, min: 3, max: 255 },
    short_link: { type: String, required: true },
    views: { type: Number, default: 0 },
    tags: [{ name: String, value: String }],
    reading_time: { type: Object, required: true },
    likes: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    deslikes: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    bookmark: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    comments: [{ type: mongoose.Types.ObjectId, ref: 'comment' }],
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
    },
  }
)

export default mongoose.model('blog', BlogSchema)