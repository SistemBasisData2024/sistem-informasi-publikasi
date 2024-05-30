const dotenv = require("dotenv");
dotenv.config();

//Routes
const threadRoutes = require("./routes/ThreadRoute");
const userRoutes = require("./routes/UserRoute");

const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();
const PORT = process.env.PORT;

//Connect To the Database
db.connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

//All route starts with /thread will be redirected to threadRoutes
app.use("/thread", threadRoutes);

//All route starts with /user will be redirected to userRoutes
app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT} `);
});
