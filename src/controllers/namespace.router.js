import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import ConversationModel from '../models/conversation.models.js'

/**
 * Create namespace
 */
export const createNamespace = async (req, res, next) => {
  try {
    const { title, endpoint } = req.body
    await findNamespaceWithEndpoint(endpoint)

    const conversation = await ConversationModel.create({ title, endpoint })
    if (!conversation) throw createHttpError.InternalServerError('FAILED_CREATE_CONVERSATION')

    res.status(StatusCodes.CREATED).json({
      success: true,
      status: StatusCodes.CREATED,
      message: 'CREATED_CONVERSATION',
    })
  } catch (err) {
    next(err)
  }
}

/**
 * Get list of namespaces
 */
export const getNamespaces = async (req, res, next) => {
  try {
    const namespaces = await ConversationModel.find({}, { rooms: 0 })
    if (!namespaces) createHttpError.InternalServerError('FAILED_GET_NAMESPACES')

    res.status(StatusCodes.OK).json({
      success: true,
      status: StatusCodes.OK,
      namespaces,
    })
  } catch (err) {
    next(err)
  }
}

/**
 * Find namespace by endpoint
 */
const findNamespaceWithEndpoint = async endpoint => {
  const conversation = await ConversationModel.findOne({ endpoint })
  if (conversation) throw createHttpError.BadRequest('ENDPOINT_ALREADY_EXISTS')
}
