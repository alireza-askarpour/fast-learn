import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Types.ObjectId, ref: 'user' },
  message: { type: String },
  dateTime: { type: Number },
})

const LocationSchema = new mongoose.Schema({
  sender: { type: mongoose.Types.ObjectId, ref: 'user' },
  location: { type: Object, default: {} },
  dateTime: { type: Number },
})

const RoomSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  image: { type: String },
  messages: { type: [MessageSchema], default: [] },
  locations: { type: [LocationSchema], default: [] },
})

const ConversationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  endpoint: { type: String, required: true },
  rooms: { type: [RoomSchema], default: [] },
})

export default mongoose.model('conversation', ConversationSchema)
