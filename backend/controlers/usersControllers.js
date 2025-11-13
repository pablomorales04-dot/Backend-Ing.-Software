const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModels')
const { use } = require('react')

const login = asyncHandler(async(req,res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user.id,
            nombre: user.nombre,
            email: user.email,
            token: generarToken(user.id)

        })
    }
})

const register = asyncHandler(async(req,res) => {
    const {nombre, email, password} = req.body
    if (!nombre || !email || !password) {
        res.status(400)
        throw new Error('Faltan datos')
    }
    const userExists = await User.findOne({email})
    if (userExists) {
        res.status(400)
        throw new Error ('Este usuario ya existe')
    }
    else {
        //hash al password
        const salt = await bcrypt.genSalt(10)
        const passwordHashed = await bcrypt.hash(password,salt)

        //Crear el usuario
        const user = await User.create({
            nombre: nombre,
            email: email,
            password: passwordHashed
        })
        //Sie el usuario se creo correctamente
        if(user) {
            res.status(201).json({
                _id: user.id,
                nombre: user.nombre,
                email: user.email,
                password: user.password
            })
        }
        else {
            res.status(400)
            throw new error ('No se pudieron guardar los datos')
        }
    }
})

const data = asyncHandler(async(req,res) => {
    res.status(200).json(req.user)
})

const generarToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: "30d"
    })
}

module.exports = {
    login, register, data
}