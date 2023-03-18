import fs from 'fs'
import path from 'path'

import multer from 'multer'
import createHttpError from 'http-errors'

import { nanoid, alphabetLowerCaseLetters } from '../config/nanoid.config.js'

const thumbnailStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const directory = './uploads/thumbnail'
    fs.mkdirSync(directory, { recursive: true })
    return cb(null, directory)
  },
  filename: (req, file, cb) => {
    cb(null, nanoid(alphabetLowerCaseLetters, 16) + path.extname(file.originalname))
  },
})

const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const directory = './uploads/episodes'
    fs.mkdirSync(directory, { recursive: true })
    return cb(null, directory)
  },
  filename: (req, file, cb) => {
    cb(null, nanoid(alphabetLowerCaseLetters, 16) + path.extname(file.originalname))
  },
})

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname)
  const mimetypes = ['.jpg', '.jpeg', '.png', '.webp', '.gif']
  if (mimetypes.includes(ext)) return cb(null, true)
  return cb(createHttpError.BadRequest('The submitted image format is not correct'))
}

function videoFilter(req, file, cb) {
  const ext = path.extname(file.originalname)
  const mimetypes = ['.mp4', '.mpg', '.mov', '.avi', '.mkv']
  if (mimetypes.includes(ext)) {
    return cb(null, true)
  }
  return cb(createError.BadRequest('The format of the video sent is not correct.'))
}

const pictureMaxSize = 1 * 1000 * 1000 // 1MB
const videoMaxSize = 300 * 1000 * 1000 //300MB

export const uploadCourseThumbnail = multer({
  storage: thumbnailStorage,
  fileFilter,
  limits: { fileSize: pictureMaxSize },
})

export const uploadEpisodeVideo = multer({
  storage: videoStorage,
  videoFilter,
  limits: { fileSize: videoMaxSize },
})
