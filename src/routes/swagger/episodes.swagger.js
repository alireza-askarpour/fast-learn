/**
 * @swagger
 *  components:
 *      schemas:
 *          AddEpisode:
 *              type: object
 *              required:
 *                  -   courseId
 *                  -   chapterId
 *                  -   title
 *                  -   description
 *                  -   video
 *                  -   type
 *              properties:
 *                  courseId:
 *                      type: string
 *                      example: 6412ccd257e06c4757efeb22
 *                  chapterId:
 *                      type: string
 *                      example: 64148e3d4bf12e7869084dca
 *                  title:
 *                      type: string
 *                      description: the title of episode
 *                      example: video number one
 *                  description:
 *                      type: string
 *                      description: the describe about this episode
 *                      example: In this episode, it is said about...
 *                  type:
 *                      type: string
 *                      description: the episode type (unlock or lock)
 *                      enum:
 *                          -   unlock
 *                          -   lock
 *                  video:
 *                      type: string
 *                      description: the file of video
 *                      format: binary
 *          EditEpisode:
 *              type: object
 *              required: true
 *                -  courseId
 *                -  chapterId
 *              properties:
 *                  courseId:
 *                      type: string
 *                      example: 6412ccd257e06c4757efeb22
 *                  chapterId:
 *                      type: string
 *                      example: 64148e3d4bf12e7869084dca
 *                  title:
 *                      type: string
 *                      description: the title of episode
 *                      example: edit video number two
 *                  description:
 *                      type: string
 *                      description: the describe about this episode
 *                      example: edit In this episode, it is said about...
 *                  type:
 *                      type: string
 *                      description: the episode type (unlock or lock)
 *                      enum:
 *                          -   unlock
 *                          -   lock
 *                  video:
 *                      type: string
 *                      description: the file of video
 *                      format: binary
 */

/**
 * @swagger
 *  /episodes:
 *      post:
 *          tags: [Episodes(Admin-Panel)]
 *          summary: create new Chapter for courses
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/AddEpisode'
 *          responses:
 *              201:
 *                  description: success - created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */

/**
 * @swagger
 *  /episodes/{episodeId}:
 *      patch:
 *          tags: [Episodes(Admin-Panel)]
 *          summary: edit episode of chapter
 *          parameters:
 *              -   in: path
 *                  name: episodeId
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/EditEpisode'
 *          responses:
 *              201:
 *                  description: success - created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */

/**
 * @swagger
 *  /episodes/{episodeId}:
 *      delete:
 *          tags: [Episodes(Admin-Panel)]
 *          summary: remove episode by episode ID
 *          parameters:
 *             -  in: path
 *                name: episodeId
 *                type: string
 *                required: true
 *          responses:
 *              200:
 *                  description: success - removed
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */
