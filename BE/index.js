const express = require('express');
const app = express();
const db = require ('./db/pgConnect');
const cors = require('cors');
const userRoutes = require("./routes/UserRoute");
const divisiRoutes = require("./routes/DivisiRoute");
const adminRoutes = require("./routes/AdminRoute");
const noteRoutes = require("./routes/NoteRoute");
const session = require('express-session');
const corsOptions = {
    origin: "http://localhost:5173", 
    methods: "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    credentials: true,
};


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(session({
    secret: 'key',
    resave: false,
    saveUninitialized: true,
    cookie: {
    
        domain: 'localhost',
        maxAge: 24 * 60 * 60 * 1000,
        secure: false
    }
}));



app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
}); 

app.use("/user", userRoutes);
app.use("/divisi", divisiRoutes);
app.use("/admin", adminRoutes)
app.use("/notes",noteRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});