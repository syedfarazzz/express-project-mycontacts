//asyncHandler is used as an easy alternate way for try catch blocks, but for that we utilized a built in middleware i.e. errorHandler
const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get All Contacts
//@route GET /api/contacts
//@access Private
const getContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
    // res.status(200).json({message: "Get All Contacts"});
});

//@desc Get Single Contacts
//@route GET /api/contacts/:id
//@access Private
const getContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }
    if(contact.user_id.toString() !== req.user.id)
    {
        res.status(403);
        throw new Error("User don't have permission to see other user's added contacts");
    }
    res.status(200).json({message: `Get contact for ${req.params.id}`, contact});
});

//@desc Create New Contact
//@route POST /api/contacts
//@access Private
const createContact = asyncHandler( async(req, res) => {
    console.log("The request body is", req.body);

    const {name , email, phone} = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mendatory !");
    }
    const createdContact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id,
        // createdBy: req.user.username     //update scheme if want to use
    }) 
    res.status(201).json(createdContact);
});

//@desc Update Contact
//@route PUT /api/contacts/:id
//@access Private
const updateContact = asyncHandler( async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }

    if(contact.user_id.toString() !== req.user.id)
    {
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}     //This option tells Mongoose to return the updated document after the update operation is performed. 
    );
    res.status(200).json({message: `Update Contact for ${req.params.id}`, updatedContact});
});

//@desc Delete Contact
//@route DELETE /api/contacts/:id
//@access Private
const deleteContact = asyncHandler( async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    console.log(contact);
    if (!contact){
        res.status(404);
        throw new Error("Contact not Found");
    }
    if(contact.user_id.toString() !== req.user.id)
    {
        res.status(403);
        throw new Error("User don't have permission to delete other user contacts");
    }
    // const deletedContact = await Contact.findByIdAndDelete(req.params.id);

    //Moreways:
    const deletedContact = await Contact.deleteOne({_id: req.params.id});
    res.status(200).json(deletedContact);
});

module.exports = {getContact, getContacts, createContact, updateContact, deleteContact};