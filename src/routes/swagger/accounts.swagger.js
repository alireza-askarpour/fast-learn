/**
 * @swagger
 *    components:
 *       schemas:
 *          Login:
 *             type: object
 *             required:
 *                -  email
 *                -  password
 *             properties:
 *                   email:
 *                      type: string
 *                      description: the user email for login
 *                   password:
 *                       type: string
 *                       description: the user password for signup
 *          Signup:
 *             type: object
 *             required:
 *                -  email
 *                -  password
 *                -  fullname
 *             properties:
 *                   fullname:
 *                      type: string
 *                      description: the user fullname for signup
 *                   email:
 *                      type: string
 *                      description: the user email for signup
 *                   password:
 *                       type: string
 *                       description: the user password for signup
 *          RefreshToken:
 *             type: object
 *             required:
 *                -  refreshToken
 *             properties:
 *                refreshToken:
 *                   type: string
 *                   description: enter refresh-token for get refresh token and refresh-token
 *          UploadAvatar:
 *             type: object
 *             properties:
 *                avatar:
 *                   type: string
 *                   format: binary
 *          UploadCover:
 *             type: object
 *             properties:
 *                cover:
 *                   type: string
 *                   format: binary
 *          CreateSkill:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      description: the name of skill
 *                  value:
 *                      type: string
 *                      description: the title of skil
 */

/**
 * @swagger
 *    /accounts/admin/login:
 *       post:
 *          tags: [Authentication]
 *          summary: login admin in to admin panel with email and password
 *          requestBody:
 *             required: true
 *             content:
 *                application/x-www-form-urlencoded:
 *                   schema:
 *                      $ref: '#/components/schemas/Login'
 *                application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/Login'
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
 *    /accounts/login:
 *       post:
 *          tags: [Authentication]
 *          summary: login user in account with email and password
 *          requestBody:
 *             required: true
 *             content:
 *                application/x-www-form-urlencoded:
 *                   schema:
 *                      $ref: '#/components/schemas/Login'
 *                application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/Login'
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
 *          tags: [Authentication]
 *          summary: signup user in account with email and password
 *          requestBody:
 *             required: true
 *             content:
 *                application/x-www-form-urlencoded:
 *                   schema:
 *                      $ref: '#/components/schemas/Signup'
 *                application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/Signup'
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
 *          tags: [Authentication]
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
 *    /accounts/me:
 *       get:
 *          tags: [Account]
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

/**
 * @swagger
 *    /accounts/basket/add/{courseId}:
 *       patch:
 *          tags: [Account]
 *          summary: add couese to basket
 *          parameters:
 *              -   in: path
 *                  name: courseId
 *                  type: string
 *                  required: true
 *          responses:
 *             201:
 *                description: Success
 *             400:
 *                description: Bad Request
 *             401:
 *                description: Unauthorized
 *             500:
 *                description: Internal Server Error
 */

/**
 * @swagger
 *    /accounts/basket/remove/{courseId}:
 *       patch:
 *          tags: [Account]
 *          summary: remove couese from basket
 *          parameters:
 *              -   in: path
 *                  name: courseId
 *                  type: string
 *                  required: true
 *          responses:
 *             201:
 *                description: Success
 *             400:
 *                description: Bad Request
 *             401:
 *                description: Unauthorized
 *             500:
 *                description: Internal Server Error
 */

/**
 * @swagger
 *    /accounts/upload-avatar:
 *       patch:
 *          tags: [Account]
 *          summary: upload avatar for user
 *          requestBody:
 *             required: true
 *             content:
 *                multipart/form-data:
 *                   schema:
 *                      $ref: '#/components/schemas/UploadAvatar'
 *          responses:
 *             201:
 *                description: uploaded avatar
 */

/**
 * @swagger
 *    /accounts/remove-avatar:
 *       patch:
 *          tags: [Account]
 *          summary: remove avatar for user
 *          responses:
 *             200:
 *                description: removed avatar
 */

/**
 * @swagger
 *    /accounts/upload-cover:
 *       patch:
 *          tags: [Account]
 *          summary: upload cover for user
 *          requestBody:
 *             required: true
 *             content:
 *                multipart/form-data:
 *                   schema:
 *                      $ref: '#/components/schemas/UploadCover'
 *          responses:
 *             201:
 *                description: uploaded cover
 */

/**
 * @swagger
 *    /accounts/remove-cover:
 *       patch:
 *          tags: [Account]
 *          summary: remove cover for user
 *          responses:
 *             200:
 *                description: removed cover
 */

/**
 * @swagger
 *    /accounts/create-skill:
 *       post:
 *          tags: [Account]
 *          summary: create new skill
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/CreateSkill'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CreateSkill'
 *          responses:
 *             201:
 *                description: created skill
 */
