const express = require("express");
const passport = require("passport");
const {
  handleGoogleCallback,
  getProfile,
  refreshAccessToken,
  logout,
} = require("../controllers/login.controller");
const logincontroller  =  require("../controllers/login.controller");
const ensureAuthenticated = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/login", (req, res) => {
  res.send('<h1>Login</h1><p><a href="/auth/google">Login with Google</a></p>');
});

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email", "openid"],
    accessType: "offline",
    prompt: "consent",
  })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { 
    successRedirect:"http://localhost:5174/dashboard",
    failureRedirect: "http://localhost:5174/login" 
  }),
  handleGoogleCallback
);

router.get("/dashboard", ensureAuthenticated);
router.get("/api/profile", ensureAuthenticated, handleGoogleCallback);
router.get("/refresh", refreshAccessToken);
router.get("/logout", logout);

module.exports = router;