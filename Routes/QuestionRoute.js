const express = require('express');
const router = express.Router()


const {getquestions, postquestion ,getTitleandDescription}= require("../Controller/QuestionController")

router.get("/all-questions", getquestions)
router.get("/tileanddescription/:questionid", getTitleandDescription)
router.post("/post-question",postquestion)

module.exports = router







// const express = require('express');
// const router = express.Router()



// // authication middlwer
// const authMiddleware = require('../middleware/authMiddleware')
// router.get("/all-questions",authMiddleware, (req,res) =>{
//     res.send("all questions")
// })


// // registe route
// router.post("/register",(req,res)=>{
//     res.send("register user")
// })

// // login user
// router.post("/login",(req,res)=>{
//     res.send("login user")
// })

// // check user
// router.get("/check",(req,res)=>{
//     res.send("check user")
// })
// module.exports = router