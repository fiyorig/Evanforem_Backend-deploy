const { StatusCodes } = require("http-status-codes")
const dbConnection = require("../db/dbConfig")


async function getAnswers (req, res){
    const {ID} = req.params

    try {
         const [answers] = await dbConnection.query('SELECT answers.answer, users.username FROM answers INNER JOIN users ON answers.userid = users.userid WHERE questionid = ?',[ID])

         console.log(answers)

         res.status(StatusCodes.OK).send(answers)
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.BAD_REQUEST).json({msg:'something went wrong'})
    }
}


async function postAnswer (req, res){

      const{answer}=req.body;
      const{ID}=req.params
      const{userid}=req.user

      try {
           await dbConnection.query('INSERT INTO answers (questionid,userid,answer) VALUES(?,?,?)',[ID,userid,answer])

           res.status(StatusCodes.OK).json({msg:"answer added to the database"})
      } catch (error) {
        console.log(error)
        res.status(StatusCodes.BAD_REQUEST).json({msg:'something went wrong'})
      }
}

module.exports = {getAnswers,postAnswer}