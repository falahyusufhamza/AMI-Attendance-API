const express = require("express");
const cors = require("cors");
const fs = require('fs');
const path = require('path')
const cookieParser = require('cookie-parser');

const app = express();
const sequelize = require("./database/database");
const userRoutes = require("./api/users");
const authorisationRoute = require("./api/authorisation");
const studentRoutes = require("./api/student");
const classRoutes = require("./api/class");
const attendanceRoutes = require("./api/attendance");

app.use(express.urlencoded({ extended: true }));

// Read and parse the .env file
// const envPath = path.resolve(__dirname, '.env');
// const envVariables = fs.readFileSync(envPath, 'utf-8').split('\n');
// envVariables.forEach(variable => {
//   const [key, value] = variable.split('=');
//   if (key && value) {
//     process.env[key] = value;
//   }
// });

const corsConfig = {
  // origin: [process.env.DOMAIN_NAME_1],
  origin: ["https://ami-attendance-app.onrender.com"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};


app.use(cors(corsConfig))
app.use(express.json())
app.use(cookieParser())



app.use(userRoutes);

app.use(authorisationRoute);

app.use(studentRoutes);
app.use(classRoutes);
app.use(attendanceRoutes);


sequelize.sync().then(res => {
    console.log("Connected successfully");
    if(process.env.ENV === "DEVELOPMENT") {
        app.listen(8080);
        console.log("Running locally!");
    } else {
      app.listen(5000);
      console.log("Running on Render!");
    }
}).catch(err => {
    console.log("Failed to connect ", err);
})

module.exports = app;
