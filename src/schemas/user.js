const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    userName: String,
    userId: String,
    userIcon: { type: String, required: false },
    userFavStock: { type: String, required: false },
    userAge: Number,
    userPreferedName: String,
});

module.exports = model('User', userSchema, 'users');
