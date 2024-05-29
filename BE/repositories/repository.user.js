const { pool } = require("../db/pgConnect");
const crypto = require("crypto")

async function signup(req, res) {
  const { username, password, email, divisi } = req.body;
  try {
    if (!username || !password || !email || !divisi) {
      return res
        .status(400)
        .send("All fields are required: username, password, email, divisi");
    }
    let hashedPassword;
    if (password) {
      hashedPassword = crypto
        .createHash("sha256")
        .update(password)
        .digest("base64")
        .slice(0, 32);
      /* console.log(
        `Password before hash: ${password}\nPassword after hash: ${hashedPassword}`
      ); */
    }
    const duplicate = await pool.query(
      "SELECT * FROM USERS WHERE USERNAME = $1",
      [username]
    );
    if (duplicate.rows.length>0) {
      res.status(200).send("Username already exists");
    }

    const result = await pool.query(
      "INSERT INTO USERS (USERNAME,PASSWORD,EMAIL) VALUES ($1,$2,$3) RETURNING USER_ID, USERNAME, EMAIL",
      [username, hashedPassword, email]
    );
    
    const userId = result.rows[0].user_id;

    if (divisi) {
      const divisi_id = await pool.query(
        "SELECT DIVISI_ID FROM DIVISI WHERE NAME = $1",
        [divisi]
      );
      //console.log(userId);
      //console.log(divisi_id.rows[0].divisi_id);
      await pool.query(
        "INSERT INTO USER_DIVISI (USER_ID,DIVISI_ID) VALUES($1,$2)",
        [userId, divisi_id.rows[0].divisi_id]
      );
    }

    res.status(200).send(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function login(req, res) {
    const { username, password, email, divisi } = req.body;
    try {
      if (!username || !password || !email || !divisi) {
        return res
          .status(400)
          .send("All fields are required: username, password, email, divisi");
      }
      let hashedPassword;
      if (password) {
        hashedPassword = crypto
          .createHash("sha256")
          .update(password)
          .digest("base64")
          .slice(0, 32);
        /* console.log(
          `Password before hash: ${password}\nPassword after hash: ${hashedPassword}`
        ); */
      }
      const duplicate = await pool.query(
        "SELECT * FROM USERS WHERE USERNAME = $1",
        [username]
      );
      if (duplicate.rows.length>0) {
        res.status(200).send("Username already exists");
      }
  
      const result = await pool.query(
        "INSERT INTO USERS (USERNAME,PASSWORD,EMAIL) VALUES ($1,$2,$3) RETURNING USER_ID, USERNAME, EMAIL",
        [username, hashedPassword, email]
      );
      
      const userId = result.rows[0].user_id;
  
      if (divisi) {
        const divisi_id = await pool.query(
          "SELECT DIVISI_ID FROM DIVISI WHERE NAME = $1",
          [divisi]
        );
        //console.log(userId);
        //console.log(divisi_id.rows[0].divisi_id);
        await pool.query(
          "INSERT INTO USER_DIVISI (USER_ID,DIVISI_ID) VALUES($1,$2)",
          [userId, divisi_id.rows[0].divisi_id]
        );
      }
  
      res.status(200).send(result.rows[0]);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }

module.exports = { signup };
