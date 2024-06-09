const { Console } = require("console");
const { pool } = require("../db/pgConnect");
const crypto = require("crypto");

const {
  setLoggedInUserId,
  getLoggedInUserId,
} = require("../controller/usersession");

async function adminLogin(req, res) {
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
        if (result.rows[0].roles !== "Admin") {
          return res.status(403).send("Access denied: Admin only!");
        } else {
          const LoggedInId = result.rows[0].user_id;
          setLoggedInUserId(req, LoggedInId);
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

async function adminGrant(req, res) {
  const { username } = req.body;
  try {
    if (getLoggedInUserId(req)) {
      usersess_id = getLoggedInUserId(req);
      console.log(usersess_id);
    } else {
      return res.status(440).send("Login session expired");
    }
    result = await pool.query("SELECT * FROM USERS WHERE USER_ID = $1", [
      user_id,
    ]);
    console.log(result.rows[0].roles);
    if (result.rows.length === 0 || result.rows[0].roles !== "Admin") {
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
      await pool.query("UPDATE USERS SET roles = 'Admin' WHERE username = $1", [
        username,
      ]);
      res.status(200).send(`Role of ${username} updated to Admin`);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function adminGetRequest(req, res) {
  try {
    let user_id;
    if (getLoggedInUserId(req)) {
      user_id = getLoggedInUserId(req);
    } else {
      return res.status(440).send("Login session expired");
    }
    result = await pool.query("SELECT * FROM USERS WHERE USER_ID = $1", [
      user_id,
    ]);
    console.log(result.rows[0].roles);
    if (result.rows.length === 0 || result.rows[0].roles !== "Admin") {
      return res.status(403).send("Access denied: Admins only");
    }

    result = await pool.query("SELECT * FROM KONTEN");
    res.status(200).send(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function adminApprove(req, res) {
  try {
    const { konten_id } = req.body;
    let user_id;
    if (getLoggedInUserId(req)) {
      user_id = getLoggedInUserId(req);
    } else {
      return res.status(440).send("Login session expired");
    }
    result = await pool.query("SELECT * FROM USERS WHERE USER_ID = $1", [
      user_id,
    ]);
    if (result.rows.length === 0 || result.rows[0].roles !== "Admin") {
      return res.status(403).send("Access denied: Admins only");
    }
    const tahap_id = await pool.query(
      "SELECT * FROM KONTEN INNER JOIN TAHAP ON KONTEN.TAHAP_ID = TAHAP.ID WHERE KONTEN_ID = $1",
      [konten_id]
    );
    const currentTahap = tahap_id.rows[0].nama_tahap;
    const tahapMap = {
      "Quality Control": "Design",
      "Design": "Ready to Publish",
      "Ready to Publish": "Published",
    };

    const nextTahap = tahapMap[currentTahap];
    if (!nextTahap) {
      return res.status(400).send("Invalid tahap name");
    }
    const nextTahapID = await pool.query(
      "SELECT * FROM TAHAP WHERE NAMA_TAHAP = $1",
      [nextTahap]
    );
    const updated = await pool.query(
      "UPDATE KONTEN SET TAHAP_ID = $1 WHERE KONTEN_ID = $2 RETURNING *",
      [nextTahapID.rows[0].id, konten_id]
    );
    if (updated.rows.length == 0) {
      return res.status(500).send("Failed to Update");
    }
      return res.status(200).send("Updated Successfuly");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function adminGetUsers(req,res){
  try {
    let user_id;
    if (getLoggedInUserId(req)) {
      user_id = getLoggedInUserId(req);
    } else {
      return res.status(440).send("Login session expired");
    }
    result = await pool.query("SELECT * FROM USERS WHERE USER_ID = $1", [
      user_id,
    ]);
    if (result.rows.length === 0 || result.rows[0].roles !== "Admin") {
      return res.status(403).send("Access denied: Admins only");
    }
    users = await pool.query("SELECT USERNAME, EMAIL, ROLES FROM USERS WHERE USER_ID != $1",[user_id]);
    if (users.rows.length == 0){
      return res.status(404).send("No Accounts Found");
    }
    return res.status(200).send(users.rows);
  }
  catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function adminDeleteKonten(req,res){
  try {
    const { konten_id } = req.body;
    let user_id;
    if (getLoggedInUserId(req)) {
      user_id = getLoggedInUserId(req);
    } else {
      return res.status(440).send("Login session expired");
    }
    result = await pool.query("SELECT * FROM USERS WHERE USER_ID = $1", [
      user_id,
    ]);
    if (result.rows.length === 0 || result.rows[0].roles !== "Admin") {
      return res.status(403).send("Access denied: Admins only");
    }
    const deleted = await pool.query("DELETE FROM KONTEN WHERE KONTEN_ID = $1",[konten_id]);
    if (deleted.rows.length == 0){
      return res.status(500).send("Failed to delete");
    }
    return res.status(200).send("Deleted Successfully");
  }
  catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { adminLogin, adminGrant, adminGetRequest, adminApprove, adminGetUsers, adminDeleteKonten };
