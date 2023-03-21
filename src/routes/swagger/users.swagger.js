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
