import mongoose from 'mongoose'
import { CommentSchema } from './public.schema.js'

const EpisodeMoedls = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, default: 'unlock' },
    time: { type: String, required: true },
    videoAddress: { type: String, required: true },
  },
  { versionKey: false, toJSON: { virtuals: true, timestamps: true } }
)

const ChapterMoedls = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    episodes: { type: [EpisodeMoedls], default: [] },
  },
  { versionKey: false, timestamps: true }
)

const CourseMoedls = new mongoose.Schema(
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
    category: { type: mongoose.Types.ObjectId, required: true },
    comments: { type: [CommentSchema], default: [] },
    like: { type: [mongoose.Types.ObjectId], ref: 'users', default: [] },
    deslike: { type: [mongoose.Types.ObjectId], ref: 'users', default: [] },
    bookmark: { type: [mongoose.Types.ObjectId], ref: 'users', default: [] },
    chapters: { type: [ChapterMoedls], default: [] },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export default mongoose.model('course', CourseMoedls)
