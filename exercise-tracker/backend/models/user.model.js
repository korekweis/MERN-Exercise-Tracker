const mongoose = require('mongoose');

//always start schema with this 
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, //means to trim the white space in the end
        minlength: 3 //atleast 3 chars long
    },
}, {
    timestamps: true,
    //create fields that will be included on when the user was created
});

//mongoose.model('any-name', schemaname);
const User = mongoose.model('User', userSchema);

module.exports = User;