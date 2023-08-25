const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
    {
    name: {
        type: String,
        required: [true, "Please add the contact name"],
    },
    email: {
        type: String,
        required: [true, "Please add the contact email address"],
    },
    phone: {
        type: String,
        required: [true, "Please add the contact phone number"],
    },
    },
    {
        timestamps: true,
    }
);

//providing name Contact for this model
//compiling our schema into a Model.
module.exports = mongoose.model("Contact", contactSchema);