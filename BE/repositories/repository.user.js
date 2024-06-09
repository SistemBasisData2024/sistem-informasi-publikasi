const { Console } = require("console");
const { pool } = require("../db/pgConnect");
const crypto = require("crypto");

const {
  setLoggedInUserId,
  getLoggedInUserId,
} = require("../controller/usersession");

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
    if (duplicate.rows.length > 0) {
      return res.status(200).send("Username already exists");
    }
    let divisi_id;
    if (divisi) {
      divisi_id = await pool.query(
        "SELECT DIVISI_ID FROM DIVISI WHERE NAME = $1",
        [divisi]
      );
      if (divisi_id.rows.length === 0) {
        return res.status(404).send("Divisi Not Found");
      }
    }

    const result = await pool.query(
      "INSERT INTO USERS (USERNAME,PASSWORD,EMAIL) VALUES ($1,$2,$3) RETURNING USER_ID, USERNAME, EMAIL",
      [username, hashedPassword, email]
    );

    const userId = result.rows[0].user_id;

    if (divisi_id) {
      await pool.query(
        "INSERT INTO USER_DIVISI (USER_ID,DIVISI_ID) VALUES($1,$2)",
        [userId, divisi_id.rows[0].divisi_id]
      );
    }

    res.status(200).send(result.rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
}

async function login(req, res) {
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
      /* console.log(
          `Password before hash: ${password}\nPassword after hash: ${hashedPassword}`
        ); */
    }
    result = await pool.query(
      "SELECT user_id,username,password FROM USERS WHERE USERNAME = $1",
      [username]
    );
    if (result.rows.length > 0) {
      if (result.rows[0].password == hashedPassword) {
        const LoggedInId = result.rows[0].user_id;
        setLoggedInUserId(req, LoggedInId);
        console.log(getLoggedInUserId(req));
        res.status(200).send(result.rows[0]);
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

async function request_post(req, res) {
  try {
    const { title, up_time, insidental, kanal, notes, file_path } = req.body;
    let requester_id;
    if (getLoggedInUserId(req)) {
      requester_id = getLoggedInUserId(req);
    } else {
      return res.status(440).send("Login session expired");
    }
    if (!title || !up_time || !insidental || !kanal) {
      return res
        .status(400)
        .send(
          "All fields are required: title, up_date, insidental, kanal, file_path"
        );
    }
    const tahap_id = await pool.query(
      "SELECT * FROM TAHAP WHERE NAMA_TAHAP = 'Quality Control'"
    );
    let request_result;
    if (file_path) {
      request_result = await pool.query(
        "INSERT INTO KONTEN (REQUESTER_ID,TITLE,UP_TIME,INSIDENTAL,KANAL,TAHAP_ID,FILE_PATH) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
        [
          requester_id,
          title,
          up_time,
          insidental,
          kanal,
          tahap_id.rows[0].id,
          file_path,
        ]
      );
    } else {
      request_result = await pool.query(
        "INSERT INTO KONTEN (REQUESTER_ID,TITLE,UP_TIME,INSIDENTAL,TAHAP_ID,KANAL) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
        [requester_id, title, up_time, insidental, tahap_id.rows[0].id, kanal]
      );
    }
    const kontenId = request_result.rows[0].konten_id;
    let note_add;
    if (notes) {
      note_add = await pool.query(
        "INSERT INTO NOTES (TAHAP_ID,KONTEN_ID,NOTES) VALUES ($1,$2,$3) RETURNING *",
        [tahap_id.rows[0].id, kontenId, notes]
      );

      if (!note_add.rows.length > 0) {
        return res.status(500).send("Failed to add note");
      }
    }
    res.status(200).send(request_result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function request_get(req, res) {
  try {
    let requester_id;
    if (getLoggedInUserId(req)) {
      requester_id = getLoggedInUserId(req);
    } else {
      return res.status(440).send("Login session expired");
    }
    request_result = await pool.query(
      "SELECT * FROM KONTEN WHERE REQUESTER_ID = $1",
      [requester_id]
    );
    res.status(200).send(request_result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function getUserById(req, res) {
  try {
    let requester_id;
    if (getLoggedInUserId(req)) {
      requester_id = getLoggedInUserId(req);
    } else {
      return res.status(440).send("Login session expired");
    }
    current = await pool.query(
      " SELECT * FROM USERS NATURAL JOIN USER_DIVISI NATURAL JOIN DIVISI WHERE USER_ID = $1",
      [requester_id]
    );
    if (current.rows.length == 0) {
      return res.status(404).send("Account Not Found");
    }
    res.status(200).send(current.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function logout(req, res) {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send("Logout failed");
      }
      res.clearCookie("sessionId"); 
      res.status(200).send("Logout successful");
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { signup, login, logout, request_post, request_get, getUserById };
