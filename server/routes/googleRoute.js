const express = require("express");
const router = express.Router();
const passport = require("passport");
const { generateToken } = require("../utils/generateToken");
require("../controllers/googleOauthController")

const FrontendURL = process.env.UI_URL;

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: `${FrontendURL}/login` }),
  function (req, res) {
    const token = generateToken(req.user);
    res.cookie("token", token, { maxAge: 36000000 });
    // Successful authentication, redirect home.
    res.redirect(`${FrontendURL}/success-login?token=${token}`);
  }
);

module.exports = router;
