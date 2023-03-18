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
 *                      example: 63f7c19528a5df3d2db7c53f
 *                  chapterId:
 *                      type: string
 *                      example: 63fe3d7998e52ba03a8ee0ef
 *                  title:
 *                      type: string
 *                      description: the title of episode
 *                      example: ویدیو شماره یک - متغیر ها
 *                  description:
 *                      type: string
 *                      description: the describe about this episode
 *                      example: توی این قسمت بطور کامل دررابطه با .... گفته شده
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
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of episode
 *                      example: ویدیو شماره یک - متغیر ها
 *                  description:
 *                      type: string
 *                      description: the describe about this episode
 *                      example: توی این قسمت بطور کامل دررابطه با .... گفته شده
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
 *  /episodes/create:
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
 *  /episodes/remove/{episodeId}:
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
