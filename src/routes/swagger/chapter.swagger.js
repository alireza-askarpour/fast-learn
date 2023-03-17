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
