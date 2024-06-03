const { Console } = require("console");
const { pool } = require("../db/pgConnect");

const {
  getLoggedInUserId,
} = require("../controller/usersession");

async function getUsers(req, res) {
  try {
    let usersess_id;
    if (getLoggedInUserId(req)) {
      usersess_id = getLoggedInUserId(req);
      console.log(usersess_id);
    } else {
      return res.status(440).send("Login session expired");
    }
    const user_result = await pool.query(
      'SELECT u.USERNAME FROM USERS u JOIN USER_DIVISI ud ON u.USER_ID = ud.USER_ID WHERE ud.DIVISI_ID = (SELECT DIVISI_ID FROM USER_DIVISI WHERE USER_ID = $1)',
      [usersess_id]
    );
    if (user_result.rows.length === 0) {
      return res.status(404).send("No other users found in the same division");
    }
    res.status(200).json(user_result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function getKonten(req, res) {
  try {
    let usersess_id;
    if (getLoggedInUserId(req)) {
      usersess_id = getLoggedInUserId(req);
      console.log(usersess_id);
    } else {
      return res.status(440).send("Login session expired");
    }
    const konten_result = await pool.query(
      'SELECT k.* FROM KONTEN k JOIN USER_DIVISI ud ON k.REQUESTER_ID = ud.USER_ID WHERE ud.DIVISI_ID = (SELECT DIVISI_ID FROM USER_DIVISI WHERE USER_ID = $1)',
      [usersess_id]
    );
    if (konten_result.rows.length === 0) {
      return res.status(404).send("No konten found for this division");
    }
    res.status(200).json(konten_result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function getDivisi(req,res){
  try{
    divisi_list = await pool.query("SELECT * FROM DIVISI");
    if (divisi_list.rows.length == 0){
      return res.status(404).send("Divisi Not Found");
    }
    res.status(200).send(divisi_list.rows);
  }
  catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { getUsers, getKonten, getDivisi };