const { StatusCodes } = require("http-status-codes")
const dbConnection = require("../db/dbConfig")
const generateUniqueId = require('generate-unique-id');

async function getquestions (req, res){
          
    try {
        
        const [questions] =await dbConnection.query(`SELECT questions.title, questions.questionid, users.username FROM questions INNER JOIN users ON questions.userid=users.userid`)
        
        console.log(questions)
        res.status(StatusCodes.OK).send(questions)

    } catch (error) {
        console.log(error)
        res.status(StatusCodes.BAD_REQUEST).json({msg:"something went wrong"})
    }
}

async function postquestion (req, res){
     
       const {title,description} =req.body
       const {userid}=req.user
       const questionid = generateUniqueId({
        length: 6,
        useLetters: false
      });

       if(!title || !description){
          res.status(StatusCodes.BAD_REQUEST).json({msg:'please provide all both title and description'})
       }

       try {

        await dbConnection.query('INSERT INTO questions(questionid,userid,title,description) VALUES (?,?,?,?)',[questionid,userid,title,description])

        res.status(StatusCodes.OK).json({msg:'question added to the database'})
        
       } catch (error) {
         console.log(error)
         res.status(StatusCodes.BAD_REQUEST).json({msg:'something went wrong'})

       }


}

async function getTitleandDescription (req, res){

    const {questionid} =req.params
    try {
        
        const [titleandDescription] =await dbConnection.query(`SELECT title, description  FROM questions  WHERE questionid=?`,[questionid])
        
        console.log(titleandDescription)
        res.status(StatusCodes.OK).send(titleandDescription)

    } catch (error) {
        console.log(error)
        res.status(StatusCodes.BAD_REQUEST).json({msg:"something went wrong"})
    }
}

module.exports = {getquestions,postquestion,getTitleandDescription}