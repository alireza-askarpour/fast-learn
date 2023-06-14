import mongoose from 'mongoose'
const { model, Schema, Types } = mongoose

const CommentSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'user' },
    blog: { type: Types.ObjectId, ref: 'blog' },
    course: { type: Types.ObjectId, ref: 'course' },
    show: { type: Boolean, required: true, default: false },
    type: { type: String, required: true, enum: ['course', 'blog'] },
    content: { type: String, required: true },
    reply: [{ type: Types.ObjectId, ref: 'comment' }],
    openToComment: { type: Boolean, required: true },
  },
  { timestamps: true, versionKey: false }
)

export default model('comment', CommentSchema)
