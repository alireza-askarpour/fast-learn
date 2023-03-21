/**
 * @swagger
 *    components:
 *       schemas:
 *          AddPermission:
 *             type: object
 *             required:
 *                -  name
 *                -  description
 *             properties:
 *                name:
 *                   type: string
 *                   description: the title of permission
 *                description:
 *                   type: string
 *                   description: the description of permission
 */

/**
 * @swagger
 *    /permissions/list:
 *       get:
 *          tags: [Permissions(Admin-Panel)]
 *          summary: get all permissions
 *          responses:
 *             200:
 *                description: success
 *             401:
 *                description: Unauthorized
 *             500:
 *                description: Internal server error
 */

/**
 * @swagger
 *    /permissions/create:
 *       post:
 *          tags: [Permissions(Admin-Panel)]
 *          summary: create new permissions
 *          requestBody:
 *             required: true
 *             content:
 *                application/x-www-form-urlencoded:
 *                   schema:
 *                      $ref: '#/components/schemas/AddPermission'
 *                application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/AddPermission'
 *          responses:
 *             200:
 *                description: success
 *             401:
 *                description: Unauthorized
 *             500:
 *                description: Internal server error
 */
