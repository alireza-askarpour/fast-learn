/**
 * @swagger
 *    components:
 *       schemas:
 *          Types:
 *             type: string
 *             enum:
 *                -  free
 *                -  paid
 *                -  subscription
 */

/**
 * @swagger
 *    components:
 *       schemas:
 *          Status:
 *             type: string
 *             enum:
 *                -  soon
 *                -  holding
 *                -  completed
 */

/**
 * @swagger
 *    components:
 *       schemas:
 *          Level:
 *             type: string
 *             enum:
 *                -  beginner
 *                -  intermediate
 *                -  advanced
 */

/**
 * @swagger
 * components:
 *    schemas:
 *       AddCourse:
 *          type: object
 *          required:
 *             -  title
 *             -  description
 *             -  slug
 *             -  tags
 *             -  category
 *             -  price
 *             -  discount
 *             -  thumbnail
 *             -  type
 *             -  level
 *          properties:
 *             title:
 *                type: string
 *                description: the title of course
 *                example: title course
 *             description:
 *                type: string
 *                description: the title of course
 *                example: test description text
 *             slug:
 *                type: string
 *                description: the title of course
 *                example: nodejs
 *             tags:
 *                type: array
 *                description: the tags of course
 *             category:
 *                type: string
 *                description: the title of course
 *                example: 640dd6975e07ea15797bd3ca
 *             price:
 *                type: number
 *                description: the title of course
 *                example: 895000
 *             discount:
 *                type: number
 *                description: the title of course
 *                example: 60
 *             thumbnail:
 *                type: string
 *                format: binary
 *             type:
 *                $ref: '#/components/schemas/Types'
 *             level:
 *                $ref: '#/components/schemas/Level'
 *       EditCourse:
 *          type: object
 *          properties:
 *             title:
 *                type: string
 *                description: the update title of course
 *             description:
 *                type: string
 *                description: the update description of course
 *             slug:
 *                type: string
 *                description: the update slug of course
 *             tags:
 *                type: array
 *                description: the update tags of course
 *             category:
 *                type: string
 *                description: the update category of course
 *                example: 640dd6975e07ea15797bd3ca
 *             price:
 *                type: number
 *                description: the update price of course
 *             discount:
 *                type: number
 *                description: the update discount of course
 *             type:
 *                $ref: '#/components/schemas/Types'
 *             level:
 *                $ref: '#/components/schemas/Level'
 *             thumbnail:
 *                type: string
 *                format: binary
 *             status:
 *                $ref: '#/components/schemas/Status'
 */

/**
 * @swagger
 *    /courses:
 *       get:
 *          tags: [Courses(Admin-Panel)]
 *          summary: get all courses
 *          parameters:
 *             -  in: query
 *                name: search
 *                type: string
 *                description: search in course, title, description
 *          responses:
 *             200:
 *                description: successfully
 *             500:
 *                description: Internal server error
 */

/**
 * @swagger
 *    /courses/{slug}:
 *       get:
 *          tags: [Courses(Admin-Panel)]
 *          summary: get a course by slug
 *          parameters:
 *             -  in: path
 *                name: slug
 *                type: string
 *                required: true
 *          responses:
 *             200:
 *                description: successfully
 *             500:
 *                description: Internal server error
 */

/**
 * @swagger
 * /courses:
 *    post:
 *       tags: [Courses(Admin-Panel)]
 *       summary: create and save courses
 *       requestBody:
 *          required: true
 *          content:
 *             multipart/form-data:
 *                schema:
 *                   $ref: '#/components/schemas/AddCourse'
 *       responses:
 *          201:
 *             description: created new course
 */

/**
 * @swagger
 *    /courses/{id}:
 *       patch:
 *          tags: [Courses(Admin-Panel)]
 *          summary: update one course by id
 *          parameters:
 *             -  in: path
 *                name: id
 *                type: string
 *                required: true
 *                example: 6412ccd257e06c4757efeb22
 *          requestBody:
 *             required: true
 *             content:
 *                multipart/form-data:
 *                   schema:
 *                      $ref: '#/components/schemas/EditCourse'
 *          responses:
 *             200:
 *                description: Updated course successfully
 *             400:
 *                description: Bad request
 *             401:
 *                description: Unauthorization
 *             500:
 *                description: Internal server error
 */
