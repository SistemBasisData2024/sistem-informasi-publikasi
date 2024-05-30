const express = require('express');
const app = express();
const db = require ('./db/pgConnect');
const cors = require('cors');
const userRoutes = require("./routes/UserRoute");
const session = require('express-session');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(session({
    secret: 'key',
    resave: false,
    saveUninitialized: true
  }));


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use("/user", userRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});