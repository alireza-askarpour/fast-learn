/**
 * @swagger
 *    components:
 *       schemas:
 *          AddBlog:
 *             type: object
 *             required:
 *                -  title
 *                -  description
 *                -  content
 *                -  slug
 *                -  tags
 *             properties:
 *                title:
 *                   type: string
 *                   description: the title of blog
 *                description:
 *                   type: string
 *                   description: the description of blog
 *                content:
 *                   type: string
 *                   description: the content of blog
 *                slug:
 *                   type: string
 *                   description: the slug of blog
 *                tags:
 *                   type: array
 *                   description: the tags of blog
 *                thumbnail:
 *                   type: string
 *                   format: binary
 */

/**
 * @swagger
 *    /blogs/create:
 *       post:
 *          tags: [Blogs(Admin-Panel)]
 *          summary: create new blog
 *          requestBody:
 *             required: true
 *             content:
 *                multipart/form-data:
 *                   schema:
 *                      $ref: '#/components/schemas/AddBlog'
 *          responses:
 *             201:
 *                description: post created successfully
 */
