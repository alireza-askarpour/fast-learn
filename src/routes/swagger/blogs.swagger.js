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
 *                -  category
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
 *                category:
 *                   type: string
 *                   description: the category of blog
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
 *                category:
 *                   type: string
 *                   description: the category of blog
 *                tags:
 *                   type: array
 *                   description: the tags of blog
 *                thumbnail:
 *                   type: string
 *                   format: binary
 */

/**
 * @swagger
 *    /blogs:
 *       post:
 *          tags: [Blogs]
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
 *    /blogs/{id}:
 *       patch:
 *          tags: [Blogs]
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
 *    /blogs/{id}:
 *       delete:
 *          tags: [Blogs]
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

/**
 * @swagger
 *    /blogs/{slug}:
 *       get:
 *          tags: [Blogs]
 *          summary: Get blog by slug
 *          parameters:
 *             -  in: path
 *                name: slug
 *                type: string
 *                required: true
 *          responses:
 *             200:
 *                description: blog resived successfully
 */

/**
 * @swagger
 *    /blogs:
 *       get:
 *          tags: [Blogs]
 *          summary: Get blogs List
 *          responses:
 *             200:
 *                description: blog resived successfully
 */

/**
 * @swagger
 *  /blogs/{id}/like:
 *      patch:
 *          tags: [Blogs]
 *          summary: like and unline blog
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /blogs/{id}/bookmark:
 *      patch:
 *          tags: [Blogs]
 *          summary: bookmark and unline blog
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
