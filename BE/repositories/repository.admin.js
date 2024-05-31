const { Console } = require("console");
const { pool } = require("../db/pgConnect");
const crypto = require("crypto");

const {
  setLoggedInUserId,
  getLoggedInUserId,
} = require("../controller/usersession");
  
async function adminLogin (req,res) {
    const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res
        .status(400)
        .send("All fields are required: username, password");
    }
    
    let hashedPassword;
    if (password) {
      hashedPassword = crypto
        .createHash("sha256")
        .update(password)
        .digest("base64")
        .slice(0, 32);
    }

    result = await pool.query(
      "SELECT user_id, username, password, roles FROM USERS WHERE username = $1",
      [username]
    );

    if (result.rows.length > 0) {
      if (result.rows[0].password == hashedPassword) {
        if (result.rows[0].roles !== 'Admin') {
          return res.status(403).send("Access denied: Admin only!");
        } else {
          const LoggedInId = result.rows[0].user_id;
          setLoggedInUserId(req,LoggedInId);
          res.status(200).send(result.rows[0]);
        }
      } else {
        res.status(401).send("Invalid Password");
      }
    } else {
      res.status(404).send("User not found");
    } 
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function adminGrant (req,res) {
  const { username } = req.body;
  try {
    if (getLoggedInUserId(req)) {
      usersess_id = getLoggedInUserId(req);
      console.log(usersess_id);
    } else {
      return res.status(440).send("Login session expired");
    }

    if (result.rows.length === 0 || result.rows[0].roles !== 'Admin') {
      return res.status(403).send("Access denied: Admins only");
    }

    if (!username) {
      return res.status(400).send("Username is required");
    }

    result = await pool.query(
      "SELECT user_id, username FROM USERS WHERE USERNAME = $1",
      [username]
    );

    if (result.rows.length > 0) {
      await pool.query(
        "UPDATE USERS SET roles = 'Admin' WHERE username = $1",
        [username]
      ); 
      res.status(200).send(`Role of ${username} updated to Admin`);
    } else {
      res.status(404).send("User not found");
    }    
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function adminPostRequest (req, res) {
    try {
    const { title, up_time, insidental, kanal, notes, file_path } = req.body;
    let requester_id;
    if (getLoggedInUserId(req)) {
      requester_id = getLoggedInUserId(req);
      console.log(requester_id);
    } else {
      return res.status(440).send("Login session expired");
    }

    if (result.rows.length === 0 || result.rows[0].roles !== 'Admin') {
      return res.status(403).send("Access denied: Admins only");
    }

    if (!title || !up_time || !insidental || !kanal) {
      return res
        .status(400)
        .send(
          "All fields are required: title, up_date, insidental, kanal, file_path"
        );
    }

    let request_result;
    if (file_path) {
      request_result = await pool.query(
        "INSERT INTO KONTEN (REQUESTER_ID,TITLE,UP_TIME,INSIDENTAL,KANAL,FILE_PATH) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
        [requester_id, title, up_time, insidental, kanal, file_path]
      );
    } else {
      request_result = await pool.query(
        "INSERT INTO KONTEN (REQUESTER_ID,TITLE,UP_TIME,INSIDENTAL,KANAL) VALUES ($1,$2,$3,$4,$5) RETURNING *",
        [requester_id, title, up_time, insidental, kanal]
      );
    }
    const kontenId = request_result.rows[0].konten_id;
    qc_id = await pool.query(
      "INSERT INTO QUALITY_CONTROL (KONTEN_ID) VALUES ($1) RETURNING QC_ID",
      [kontenId]
    );

    let note_add;
    if (notes) {
      if (qc_id.rows.length > 0) {
        note_add = await pool.query("INSERT INTO NOTES (TAHAP_ID,NOTES) VALUES ($1,$2) RETURNING *",[qc_id.rows[0].qc_id,notes]);
      }
      if (!note_add.rows.length > 0){
        return res.status(500).send("Failed to add note");
      }
    }
    res.status(200).send(request_result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function adminGetRequest (req, res) {
  try{
    let user_id;
    if (getLoggedInUserId(req)) {
      user_id = getLoggedInUserId(req);
    } else {
      return res.status(440).send("Login session expired");
    }

    if (result.rows.length === 0 || result.rows[0].roles !== 'Admin') {
      return res.status(403).send("Access denied: Admins only");
    }

    result = await pool.query ("SELECT * FROM KONTEN");
    res.status(200).send(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function adminApprove (req, res) {
  try {
    
  }
}

module.exports = { adminLogin, adminGrant, adminPostRequest, adminGetRequest, adminApprove };