/**
 * @swagger
 *    components:
 *       schemas:
 *          AddCategory:
 *             type: object
 *             required:
 *                -  name
 *                -  value
 *             properties:
 *                name:
 *                   type: string
 *                   description: name of category
 *                value:
 *                   type: string
 *                   description: value of category
 */

/**
 * @swagger
 *    components:
 *       schemas:
 *          EditCategory:
 *             type: object
 *             properties:
 *                name:
 *                   type: string
 *                   description: name of category
 *                value:
 *                   type: string
 *                   description: value of category
 */

/**
 * @swagger
 *    /categories/list:
 *       get:
 *          tags: [Categories(Admin-Panel)]
 *          summary: get all categories
 *          responses:
 *             200:
 *                description: success
 */

/**
 * @swagger
 *    /categories/create:
 *       post:
 *          tags: [Categories(Admin-Panel)]
 *          summary: create new category
 *          requestBody:
 *             content:
 *                application/x-www-form-urlencoded:
 *                   schema:
 *                      $ref: '#/components/schemas/AddCategory'
 *                application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/AddCategory'
 *          responses:
 *             201:
 *                description: Category created successfully
 *             400:
 *                description: Bad request
 *             401:
 *                description: Unauthorization
 *             500:
 *                description: Internal server error
 *
 */

/**
 * @swagger
 *    /categories/update/{id}:
 *       put:
 *          tags: [Categories(Admin-Panel)]
 *          summary: edit category by id
 *          parameters:
 *             -  in: path
 *                name: id
 *                type: string
 *                required: trie
 *          requestBody:
 *             content:
 *                application/x-www-form-urlencoded:
 *                   schema:
 *                      $ref: '#/components/schemas/EditCategory'
 *                application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/EditCategory'
 *          responses:
 *             200:
 *                description: Category updated successfully
 *             401:
 *                description: BadRequest
 */

/**
 * @swagger
 *    /categories/remove/{id}:
 *       delete:
 *          tags: [Categories(Admin-Panel)]
 *          summary: remove category by ID
 *          parameters:
 *             -  in: path
 *                name: id
 *                type: string
 *                required: true
 *          responses:
 *             200:
 *                description: Category removed successfully
 *             404:
 *                description: Not found category
 *             500:
 *                description: Internal server error
 *
 */
