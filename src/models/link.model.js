import mongoose from 'mongoose'

const LinkSchem = new mongoose.Schema(
  {
    shortLink: { type: String, unique: true, require: true },
    originalLink: { type: String, require: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export default mongoose.model('link', LinkSchem)
