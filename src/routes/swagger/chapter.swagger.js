/**
 * @swagger
 *    components:
 *       schemas:
 *          AddChapter:
 *             type: object
 *             required:
 *                -  id
 *                -  title
 *             properties:
 *                id:
 *                   type: string
 *                   description: course id
 *                title:
 *                   type: string
 *                   description: title of chapter
 *                description:
 *                   type: string
 *                   description: description of chapter
 *
 */

/**
 * @swagger
 *    components:
 *       schemas:
 *          EditChapter:
 *             type: object
 *             properties:
 *                title:
 *                   type: string
 *                   description: the edit title of chapter
 *                description:
 *                   type: string
 *                   description: the edit description of chapter
 */

/**
 * @swagger
 *    /chapters/{courseId}:
 *       get:
 *          tags: [Chapters(Admin-Panel)]
 *          summary: get a chapter by couse Id
 *          parameters:
 *             -  in: path
 *                name: courseId
 *                type: string
 *                required: true
 *          responses:
 *             200:
 *                description: Chapter received successfully
 *             500:
 *                description: Internal server error
 */

/**
 * @swagger
 *    /chapters/create:
 *       patch:
 *          tags: [Chapters(Admin-Panel)]
 *          summary: create new chapter of course
 *          requestBody:
 *             content:
 *                application/x-www-form-urlencoded:
 *                   schema:
 *                      $ref: '#/components/schemas/AddChapter'
 *                application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/AddChapter'
 *          responses:
 *             201:
 *                description: chapter craeted successfully
 *             400:
 *                description: Bad request
 *             500:
 *                description: Internal server error
 */

/**
 * @swagger
 *    /chapters/update/{chapterId}:
 *       patch:
 *          tags: [Chapters(Admin-Panel)]
 *          summary: update a chapter by chapter ID
 *          parameters:
 *             -  in: path
 *                name: chapterId
 *                type: string
 *                required: true
 *          requestBody:
 *             content:
 *                application/x-www-form-urlencoded:
 *                   schema:
 *                      $ref: '#/components/schemas/EditChapter'
 *                application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/EditChapter'
 *          responses:
 *             200:
 *                description: success
 *             400:
 *                description: Bad request
 *             401:
 *                description: Unauthorization
 *             500:
 *                description: Internal server error
 */

/**
 * @swagger
 *    /chapters/remove/{chapterId}:
 *       patch:
 *          tags: [Chapters(Admin-Panel)]
 *          summary: remove chapter by chapter ID
 *          parameters:
 *             -  in: path
 *                name: chapterId
 *                type: string
 *                required: true
 *          responses:
 *             200:
 *                description: success
 *             400:
 *                description: Bad request
 *             401:
 *                description: Unauthorization
 *             500:
 *                description: Internal server error
 */
