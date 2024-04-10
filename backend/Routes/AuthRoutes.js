const { register, login, profile, getProfile, quote, getFuelHistory } = require("../Controllers/AuthControllers");
const { checkUser } = require("../Middlewares/AuthMiddlewares");

const router = require("express").Router();

router.post("/profile", checkUser);
router.post("/profile/update", profile);
router.get("/profile/retrieval", getProfile);
router.post("/register", register);
router.post("/login", login);
router.post("/fuel-quote", quote);
router.get("/fuel-quote-history", getFuelHistory)

module.exports = router;