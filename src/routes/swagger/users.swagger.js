/**
 * @swagger
 *    /users/list:
 *       get:
 *          tags: [Users(Admin-Panel)]
 *          summary: get list users
 *          parameters:
 *             -  in: query
 *                name: search
 *                type: string
 *          responses:
 *             200:
 *                description: Success
 *             401:
 *                description: Unauthorized
 *             500:
 *                description: Internal server error
 *
 */

/**
 * @swagger
 *    /users/{id}:
 *       get:
 *          tags: [Users(Admin-Panel)]
 *          summary: get user by ID
 *          parameters:
 *             -  in: path
 *                name: id
 *                type: string
 *                required: true
 *          responses:
 *             200:
 *                description: Success
 *             401:
 *                description: Unauthorized
 *             500:
 *                description: Internal server error
 *
 */

/**
 * @swagger
 *    /users/remove/{id}:
 *       delete:
 *          tags: [Users(Admin-Panel)]
 *          summary: remove user by ID
 *          parameters:
 *             -  in: path
 *                name: id
 *                type: string
 *                required: true
 *          responses:
 *             200:
 *                description: Success
 *             401:
 *                description: Unauthorized
 *             500:
 *                description: Internal server error
 *
 */
