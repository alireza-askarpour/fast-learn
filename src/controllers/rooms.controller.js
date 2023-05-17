import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import ConversationModel from '../models/conversation.models.js'

/**
 * Create room
 */
export const createRoom = async (req, res, next) => {
  try {
    const { name, description, namespace } = req.body

    await findConversationWithEndpoint(namespace)
    await findRoomWithName(name)

    const image = req?.file?.path?.replace(/\\/g, '/')
    const room = { name, description, image }

    const result = await ConversationModel.updateOne({ endpoint: namespace }, { $push: { rooms: room } })
    if (!result) throw createHttpError.InternalServerError('FAILED_CREATE_ROOM')

    res.status(StatusCodes.CREATED).json({
      success: true,
      status: StatusCodes.CREATED,
      message: 'ROOM_CRAETED',
    })
  } catch (err) {
    next(err)
  }
}

/**
 * Find a room by name
 */
export const findRoomWithName = async name => {
  const conversation = await ConversationModel.findOne({ 'rooms.name': name })
  if (conversation) throw createHttpError.BadRequest('ROOM_ALEADY_EXISTS')
}

/**
 * Find conversation by endpoint
 */
export const findConversationWithEndpoint = async endpoint => {
  const conversation = await ConversationModel.findOne({ endpoint })
  if (!conversation) throw createHttpError.NotFound('NOT_FOUND_NAMESPACE')
  return conversation
}
