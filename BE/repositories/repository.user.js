const { pool } = require("../db/pgConnect");
const crypto = require("crypto");   

async function signup(req, res) {
  const { username, password, email, divisi } = req.body;
  try {
    let hashedPassword;
    if (password) {
        hashedPassword = crypto.createHash('sha256').update(password).digest('base64').slice(0, 32);
      console.log(
        `Password before hash: ${password}\nPassword after hash: ${hashedPassword}`
      );
    }
    const dup = await pool.query("SELECT * FROM USERS WHERE USERNAME = $1", [
      username,
    ]);
    if (dup) {
      res.status(200).send("Username already exists");
    }
    const rows = await pool.query(
      "INSERT INTO USERS (USERNAME,PASSWORD,EMAIL) VALUES ($1,$2,$3)",
      [username, hashedPassword, email]
    );
    res.status(200).send(rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { signup };
