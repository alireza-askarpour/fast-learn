/**
 * @swagger
 *    components:
 *       schemas:
 *          Auth:
 *             type: object
 *             required:
 *                -  email
 *                -  password
 *             properties:
 *                   email:
 *                      type: string
 *                      description: the user email for signup/signin
 *                   password:
 *                       type: string
 *                       description: the user password for signup/signin
 *          RefreshToken:
 *             type: object
 *             required:
 *                -  refreshToken
 *             properties:
 *                refreshToken:
 *                   type: string
 *                   description: enter refresh-token for get refresh token and refresh-token
 *
 */

/**
 * @swagger
 *    /accounts/login:
 *       post:
 *          tags: [User-Authentication]
 *          summary: login user in account with email and password
 *          requestBody:
 *             required: true
 *             content:
 *                application/x-www-form-urlencoded:
 *                   schema:
 *                      $ref: '#/components/schemas/Auth'
 *                application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/Auth'
 *          responses:
 *             201:
 *                description: success
 *             400:
 *                description: bad request
 *             401:
 *                description: unauthorization
 *             500:
 *                description: internal server error
 */

/**
 * @swagger
 *    /accounts/signup:
 *       post:
 *          tags: [User-Authentication]
 *          summary: signup user in account with email and password
 *          requestBody:
 *             required: true
 *             content:
 *                application/x-www-form-urlencoded:
 *                   schema:
 *                      $ref: '#/components/schemas/Auth'
 *                application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/Auth'
 *          responses:
 *             201:
 *                description: success
 *             400:
 *                description: bad request
 *             401:
 *                description: unauthorization
 *             500:
 *                description: internal server error
 */

/**
 * @swagger
 *    /accounts/refresh-token:
 *       post:
 *          tags: [User-Authentication]
 *          summary: send refresh token for get new refresh token and refresh token
 *          description: refresh token
 *          requestBody:
 *             required: true
 *             content:
 *                application/x-www-form-urlencoded:
 *                   schema:
 *                      $ref: '#/components/schemas/RefreshToken'
 *                application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/RefreshToken'
 *          responses:
 *             200:
 *                description: success
 *             500:
 *                description: internal server error
 */

/**
 * @swagger
 *    /accounts/get-me:
 *       get:
 *          tags: [User-Authentication]
 *          summary: get logged in user
 *          responses:
 *             201:
 *                description: Success
 *             400:
 *                description: Bad request
 *             401:
 *                description: Unauthorization
 *             500:
 *                description: Internal server error
 */
