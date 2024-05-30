function setLoggedInUserId(req, userId) {
    req.session.loggedInUserId = userId;
  }

  function getLoggedInUserId(req) {
    return req.session.loggedInUserId;
  }

module.exports = { setLoggedInUserId, getLoggedInUserId };