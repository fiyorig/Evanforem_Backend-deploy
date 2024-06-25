const express = require('express');
const router = express.Router()


const {getAnswers,postAnswer }= require("../Controller/AnswerController")

router.get("/:ID", getAnswers )
router.post('/:ID',postAnswer)

module.exports = router