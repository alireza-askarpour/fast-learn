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
 *       CreateCourse:
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
 *                type: string
 *                description: the title of course
 *                example: 895000
 *             discount:
 *                type: string
 *                description: the title of course
 *                example: 60
 *             thumbnail:
 *                type: string
 *                format: binary
 *             type:
 *                $ref: '#/components/schemas/Types'
 *             level:
 *                $ref: '#/components/schemas/Level'
 */

/**
 * @swagger
 * /courses/create:
 *    post:
 *       tags: [Courses(Admin-Panel)]
 *       summary: create and save courses
 *       requestBody:
 *          required: true
 *          content:
 *             multipart/form-data:
 *                schema:
 *                   $ref: '#/components/schemas/CreateCourse'
 *       responses:
 *          201:
 *             description: created new course
 */
