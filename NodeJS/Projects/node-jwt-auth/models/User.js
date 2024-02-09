const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters' ]
    }
});

// fire a function after doc saved to db
userSchema.post('save',function(doc,next){
    console.log('new user was created & saved',doc);
    next();

});

// fire a function before doc saved to db
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(); //add random string infront of password before hash for more security
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

const User = mongoose.model('user',userSchema); //has to be singular than what we created in collections

module.exports = User;