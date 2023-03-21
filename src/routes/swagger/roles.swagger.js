/**
 * @swagger
 *  components:
 *      schemas:
 *          AddRole:
 *              type: object
 *              required:
 *                  -   title
 *                  -   description
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of role
 *                  description:
 *                      type: string
 *                      description: the desc of role
 *                  permissions:
 *                      type: array
 *                      description: the permissions ID for role
 */

/**
 * @swagger
 *    /roles/list:
 *       get:
 *          tags: [RBAC(Admin-Panel)]
 *          summary: get all roles
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
 *  /roles/create:
 *      post:
 *          tags: [RBAC(Admin-Panel)]
 *          summary: create new Role
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/AddRole'
 *          responses:
 *              201:
 *                  description: created new Role
 *
 */
