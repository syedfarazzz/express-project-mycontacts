const express = require("express");
const {getContact, getContacts, createContact, updateContact, deleteContact} = require("../controllers/contactController");
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

router.route('/').get(getContacts).post(createContact);

router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);



module.exports = router