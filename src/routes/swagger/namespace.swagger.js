/**
 * @swagger
 *  components:
 *      schemas:
 *          Namespace:
 *              type: object
 *              required:
 *                  -   title
 *                  -   endpoint
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of namespace
 *                  endpoint:
 *                      type: string
 *                      description: the endpoint of namespace
 */

/**
 * @swagger
 *  /namespaces:
 *      post:
 *          tags: [Support]
 *          summary: add namespaces for chatroom
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Namespace'
 *          responses:
 *              201:
 *                  description: success
 */

/**
 * @swagger
 *  /namespaces:
 *      get:
 *          tags: [Support]
 *          summary: get list of namespaces
 *          responses:
 *              200:
 *                  description: success
 */
