const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    uniqueId: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

});

module.exports = mongoose.model("User", UserSchema);