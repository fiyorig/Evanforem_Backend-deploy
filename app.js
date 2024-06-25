require("dotenv").config();

const express = require(`express`);
const app = express();
const port = 5500;
const cors = require("cors");
// db conection
const dbConnection = require("./db/dbConfig");

app.use(cors());
// user routes middlware file
const UserRoutes = require("./Routes/UserRoute");

// quation routes middleware file
const questionsRoutes = require("./Routes/QuestionRoute");
const authMiddleware = require("./middleware/authMiddleware");

//answer Routes
const answerRoutes = require("./Routes/AnswerRoute");
// json middleware to extract json

app.use(express.json());
// user routes middleware

app.use("/api/users", UserRoutes);

//Quation routes middleware

app.use("/api/questions", authMiddleware, questionsRoutes);

//Answer routes middleware
app.use("/api/answers", authMiddleware, answerRoutes);

// app.use("/api/Answer",AnswerRout)
async function start() {
  try {
    const result = await dbConnection.execute("select'test'");
    await app.listen(port);
    console.log("database connection established");
    console.log(`listtening on${port}`);
  } catch (error) {
    console.log(error.message);
  }
}
start();
