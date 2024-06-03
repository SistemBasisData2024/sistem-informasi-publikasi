const { pool } = require("../db/pgConnect");

const {
  getLoggedInUserId,
} = require("../controller/usersession");

async function getNotes(req, res) {
  const { konten_id, tahap_id } = req.body;
  try {
    if (!konten_id || !tahap_id) {
      return res
        .status(400)
        .send("All fields are required: konten_id, tahap_id");
    }
    if (getLoggedInUserId(req)) {
      requester_id = getLoggedInUserId(req);
    } else {
      return res.status(440).send("Login session expired");
    }
    divisi = await pool.query(
      "SELECT DIVISI_ID FROM USER_DIVISI WHERE USER_ID = $1",
      [requester_id]
    );
    if (divisi.rows.length == 0) {
      return res.status(404).send("Divisi not found");
    }
    divisi_id = divisi.rows[0].divisi_id;
    divisi_author = await pool.query(
      "SELECT DIVISI_ID FROM USER_DIVISI WHERE USER_ID = (SELECT REQUESTER_ID FROM KONTEN WHERE KONTEN_ID = $1)",
      [konten_id]
    );
    let notes_result;
    if (divisi_author.rows[0].divisi_id == divisi_id) {
      notes_result = await pool.query("SELECT * FROM NOTES WHERE KONTEN_ID = $1 AND TAHAP_ID = $2",
        [konten_id, tahap_id]);
    }
    res.status(200).send(notes_result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function addNote(req, res) {
    const { konten_id, tahap_id , notes } = req.body;
    try {
      if (!konten_id || !tahap_id) {
        return res
          .status(400)
          .send("All fields are required: konten_id, tahap_id, notes");
      }
      if (getLoggedInUserId(req)) {
        requester_id = getLoggedInUserId(req);
      } else {
        return res.status(440).send("Login session expired");
      }
      divisi = await pool.query(
        "SELECT DIVISI_ID FROM USER_DIVISI WHERE USER_ID = $1",
        [requester_id]
      );
      if (divisi.rows.length == 0) {
        return res.status(404).send("Divisi not found");
      }
      divisi_id = divisi.rows[0].divisi_id;
      divisi_author = await pool.query(
        "SELECT DIVISI_ID FROM USER_DIVISI WHERE USER_ID = (SELECT REQUESTER_ID FROM KONTEN WHERE KONTEN_ID = $1)",
        [konten_id]
      );
      let notes_result;
      if (divisi_author.rows[0].divisi_id == divisi_id) {
        notes_result = await pool.query("INSERT INTO NOTES (TAHAP_ID, KONTEN_ID, NOTES) VALUES ($1,$2,$3) RETURNING *",
          [tahap_id,konten_id,notes]);
      }
      res.status(200).send(notes_result.rows);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
  
module.exports = { getNotes, addNote };
