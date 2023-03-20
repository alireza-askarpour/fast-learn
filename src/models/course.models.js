import mongoose from 'mongoose'
import { getTimeOfCourse } from '../utils/get-time.utils.js'
import { CommentSchema } from './public.schema.js'

const EpisodeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, default: 'unlock' },
    time: { type: String, required: true },
    videoAddress: { type: String, required: true },
  },
  { versionKey: false, toJSON: { virtuals: true }, timestamps: true }
)

const ChapterSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    episodes: { type: [EpisodeSchema], default: [] },
  },
  { versionKey: false, timestamps: true }
)

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    thumbnail: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    tags: { type: [String] },
    type: { type: String, required: true, enum: ['free', 'paid', 'subscription'] },
    teacher: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
    status: { type: String, required: true, enum: ['soon', 'holding', 'completed'] },
    level: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    short_link: { type: String },
    category: { type: mongoose.Types.ObjectId, ref: 'category', required: true },
    comments: { type: [CommentSchema], default: [] },
    like: { type: [mongoose.Types.ObjectId], ref: 'users', default: [] },
    deslike: { type: [mongoose.Types.ObjectId], ref: 'users', default: [] },
    bookmark: { type: [mongoose.Types.ObjectId], ref: 'users', default: [] },
    chapters: { type: [ChapterSchema], default: [] },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
    },
  }
)

CourseSchema.index({ title: 'text', description: 'text' })

CourseSchema.virtual('totalTime').get(function () {
  return getTimeOfCourse(this.chapters || [])
})

export default mongoose.model('course', CourseSchema)
