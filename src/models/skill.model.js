import mongoose from 'mongoose'

export const SkillSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    value: { type: String, require: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export default mongoose.model('skill', SkillSchema)
