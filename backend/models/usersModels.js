const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: [true, 'Por favor teclea tu nombre']

    },

    mail:{
        type: String,
        required: [true, 'Por favor teclea tu mail'],
        unique: true

    },

    password:{
        type: String,
        required: [true, 'Por favor teclea tu password']

    },

    esAdmin:{
        type: Boolean,
        default: false
    }

},{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)