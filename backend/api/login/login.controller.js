const loginService = require("./login.service.js");
const logger = require("../../services/logger.service");

// LOGIN
async function login(req, res) {
  console.log("helo");
  const { username, password } = req.body;
  console.log(username, password);
  try {
    const user = await loginService.login(username, password);
    const loginToken = loginService.getLoginToken(user);
    logger.info("User login: ", user);
    console.log(user);
    res.cookie("loginToken", loginToken, {
      expires: new Date(Date.now() + 9999999),
      httpOnly: false,
      credentials: true,
    });

    res.json(user);
  } catch (err) {
    logger.error("Failed to Login " + err);
    res.status(401).send({ err: "Failed to Login" });
  }
}

async function logout(req, res) {
  try {
    res.clearCookie("loginToken");
    res.send({ msg: "Logged out successfully" });
  } catch (err) {
    res.status(500).send({ err: "Failed to logout" });
  }
}

async function signup(req, res) {
  try {
    console.log("signup");
    const { username, password, email, avatar, isAdmin } = req.body;
    console.log(username, password, email, avatar, isAdmin);
    // Never log passwords
    // logger.debug(fullname + ', ' + username + ', ' + password)
    const account = await loginService.signup(username, password, fullname);
    logger.debug(
      `auth.route - new account created: ` + JSON.stringify(account)
    );
    const user = await loginService.login(username, password);
    const loginToken = loginService.getLoginToken(user);
    logger.info("User login: ", user);
    res.cookie("loginToken", loginToken);

    res.json(user);
  } catch (err) {
    logger.error("Failed to signup " + err);
    res.status(500).send({ err: "Failed to signup" });
  }
}

module.exports = {
  login,
  logout,
  signup,
};
