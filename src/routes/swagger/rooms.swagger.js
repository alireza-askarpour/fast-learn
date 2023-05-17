/**
 * @swagger
 *  components:
 *      schemas:
 *          Room:
 *              type: object
 *              required:
 *                  -   name
 *                  -   description
 *                  -   namespace
 *              properties:
 *                  name:
 *                      type: string
 *                      description: the title of category
 *                  description:
 *                      type: string
 *                      description: the description of text of blog
 *                  image:
 *                      type: file
 *                      description: the index picture of blog
 *                  namespace:
 *                      type: string
 *                      description: namespace of conversation
 */

/**
 * @swagger
 *  /rooms:
 *      post:
 *          tags: [Support]
 *          summary: add room in namespaces for chatroom
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Room'
 *          responses:
 *              201:
 *                  description: success
 */
