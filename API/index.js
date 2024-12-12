import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pool from "./db.js";
import register from "./routes/registration.route.js";
// import studentCourseInsert from "./routes/studentCourseInsert.route.js";
import login from "./routes/login.route.js";
import courseLookLike from "./routes/LookLike.route.js";
import sectionRoutine from "./routes/sectionRoutine.route.js";
import  userProfile from "./routes/UserPersonal.route.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/register", register);
// app.use("/api/student_course_insert", studentCourseInsert);
app.use("/api/login", login);
app.use("/api/section", sectionRoutine);
app.use("/api/user", userProfile);
app.use("/api/lookLike", courseLookLike);

// app.get('/data', async (req, res) => {
//     try {
//       // Perform a simple query to get all rows from a table
//       const result = await pool.query('SELECT * FROM course');

//       // Send the result rows as JSON
//       res.json(result.rows);
//     } catch (err) {
//       // Handle the error
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   });

app.listen(3000, () => {
  console.log(`Server is starting on port 3000`);
});
