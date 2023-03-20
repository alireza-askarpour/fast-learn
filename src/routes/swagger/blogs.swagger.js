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
 *          EditBlog:
 *             type: object
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
 *                description: blog created successfully
 */

/**
 * @swagger
 *    /blogs/update/{id}:
 *       patch:
 *          tags: [Blogs(Admin-Panel)]
 *          summary: update blog by ID
 *          parameters:
 *             -  in: path
 *                name: id
 *                type: string
 *                required: true
 *          requestBody:
 *             required: true
 *             content:
 *                multipart/form-data:
 *                   schema:
 *                      $ref: '#/components/schemas/EditBlog'
 *          responses:
 *             200:
 *                description: blog updated successfully
 */

/**
 * @swagger
 *    /blogs/remove/{id}:
 *       delete:
 *          tags: [Blogs(Admin-Panel)]
 *          summary: Remove blog by ID
 *          parameters:
 *             -  in: path
 *                name: id
 *                type: string
 *                required: true
 *          responses:
 *             200:
 *                description: blog removed successfully
 */
