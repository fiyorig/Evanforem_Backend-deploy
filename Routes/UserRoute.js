    const express = require('express');
    const router = express.Router();

    // authoremidilware
    const authMiddleware = require('../middleware/authMiddleware')
// user controllers
const {register, login, checkUser} = require('../Controller/UserControler');


    // registe route
    router.post("/register",register)

    // login user
    router.post("/login", login)

    // check user
    router.get("/check",authMiddleware,checkUser
    )
    module.exports = router