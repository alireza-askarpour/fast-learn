import mongoose from 'mongoose'

const BlogSchema = mongoose.Schema(
  {
    title: { type: String, required: true, min: 3, max: 255 },
    description: { type: String, required: true, min: 3, max: 255 },
    content: { type: String, required: true },
    author: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
    thumbnail: { type: String, default: '', required: true },
    slug: { type: String, required: true, min: 3, max: 255, unique: true },
    short_link: { type: String, required: true },
    views: { type: Number, default: 0 },
    tags: { type: [String], default: [] },
    reading_time: { type: Object, required: true },
    likes: { type: [mongoose.Types.ObjectId], ref: 'user', default: [] },
    deslikes: { type: mongoose.Types.ObjectId, ref: 'user', default: [] },
    bookmarks: { type: mongoose.Types.ObjectId, ref: 'user', default: [] },
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
