export const ROLES = Object.freeze({
  STUDENT: 'student',
  WRITER: 'writer',
  ADMIN: 'admin',
})

export const PERMISSIONS = Object.freeze({
  STUDENT: ['profile'],
  ADMIN: ['all'],
  WRITER: ['blog'],
  TEACHER: ['course', 'blog'],
  ALL: 'all',
})
