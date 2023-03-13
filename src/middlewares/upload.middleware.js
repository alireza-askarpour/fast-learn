import fs from 'fs'

import path from 'path'
import multer from 'multer'

import { nanoid, alphabetLowerCaseLetters } from '../config/nanoid.config.js'

const thumbnailStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const directory = './uploads/thumbnail'
    req.body.fileUploadPath = path.join('uploads', 'thumbnail')
    fs.mkdirSync(directory, { recursive: true })
    return cb(null, directory)
  },  
  filename: (req, file, cb) => {
    const fileName = nanoid(alphabetLowerCaseLetters, 16) 
    req.body.filename = fileName
    cb(null, fileName + path.extname(file.originalname))
  },
})

export const uploadCourseThumbnail = multer({ storage: thumbnailStorage })
