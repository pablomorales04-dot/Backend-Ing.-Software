const express = require('express')
const router = express.Router()
const {login, register, data} = require('../controlers/usersControllers')
const {protect} = require ('../middleware/authMiddleware')

//endpoints publiocos
router.post('/login', login)
router.post('/register', register)

//endpoints privados
router.get('/data', data)

module.exports = router
