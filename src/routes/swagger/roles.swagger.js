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
 *          EditRole:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of role
 *                  description:
 *                      type: string
 *                      description: the desc of role
 *                  permissions:
 *                      type: array
 *                      description: the permissionsID for role
 */

/**
 * @swagger
 *    /roles:
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
 *  /roles:
 *      post:
 *          tags: [RBAC(Admin-Panel)]
 *          summary: create new role
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

/**
 * @swagger
 *  /roles/{id}:
 *      patch:
 *          tags: [RBAC(Admin-Panel)]
 *          summary: edit role by ID
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/EditRole'
 *          responses:
 *              200:
 *                  description: Edited the role successfully
 *
 */

/**
 * @swagger
 *  /roles/{field}:
 *      delete:
 *          tags: [RBAC(Admin-Panel)]
 *          summary: remove role by ID or Title
 *          parameters:
 *              -   in: path
 *                  name: field
 *                  type: string
 *                  required: true
 *                  description: send title of role or objectId of role for remove that
 *          responses:
 *              200:
 *                  description: removed the Role
 *
 */
