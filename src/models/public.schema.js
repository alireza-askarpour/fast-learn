import mongoose from 'mongoose'

export const CommentSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
  commecnt: { type: String, required: true },
  createdAt: { type: Date, default: new Date().getTime() },
  parent: { type: mongoose.Types.ObjectId, ref: 'comment' },
})
