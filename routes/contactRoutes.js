const express = require("express");
const {getContact, getContacts, createContact, updateContact, deleteContact} = require("../controllers/contactController");
const validateToken = require("../middleware/ValidateTokenHandler");
const router = express.Router();

// router.get((req, res) => {
//     res.status(200).json({message: "Get All Contacts"});
// });
// router.delete((req, res) => {
//     res.status(200).json({message: "Delete Contact"});
// });
//the above logics can be implemented in Controller section instead of all doing in routes section

// router.route('/').get(getContacts);

// router.route('/:id').get(getContact);

// router.route('/').post(createContact);

// router.route('/:id').put(updateContact);

// router.route('/:id').delete(deleteContact);
//above same routes can be written in simplified form

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phone
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the Contact
 *         name:
 *           type: string
 *           description: The name of the contact
 *         email:
 *           type: string
 *           description: The email address
 *         phone:
 *           type: number
 *           description: Phone Number
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the contact was added
 *       example:
 *         id: d5fE_asz
 *         name: Alex
 *         email: alex@gmail.com
 *         phone: 0320246434
 *         createdAt: 2020-03-10T04:05:06.157Z
 */
/**
 
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:            # arbitrary name for the security scheme
 *       type: http
 *       in: header
 *       name: Authorization
 *       scheme: bearer
 *       bearerFormat: JWT    # optional, arbitrary value for documentation purposes
 *     BasicAuth:
 *       type: http
 *       scheme: basic
 */

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Contact book
 * 
 * /:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Lists all the contacts
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: The list of the contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 * 
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new book
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: The created contact.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       400:
 *         description: Bad Request.
 *         
 *       500:
 *         description: Some server error
 * 
 * /api/contacts/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get the contact by id
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The contact id
 *     responses:
 *       200:
 *         description: The contact response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: The contact was not found
 *   put:
 *    security:
 *      - bearerAuth: []
 *    summary: Update the contact by the id
 *    tags: [Contacts]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The contact id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Contact'
 *    responses:
 *      200:
 *        description: The contact was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Contact'
 *      404:
 *        description: The contact was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Remove the contact by id
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The contact id
 *
 *     responses:
 *       200:
 *         description: The contact was deleted
 *       404:
 *         description: The contact was not found
 */

router.use(validateToken);      //As all of the routes are Private, otherwise we would have to use with specific routes only

router.route('/').get(getContacts).post(createContact);

router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);



module.exports = router