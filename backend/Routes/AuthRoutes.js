const { register, login, profile, getProfile, checkAdmin, quote, getFuelHistory, getAllFuelHistory } = require("../Controllers/AuthControllers");
const { checkUser } = require("../Middlewares/AuthMiddlewares");

const router = require("express").Router();

router.post("/profile", checkUser);
router.post("/profile/update", profile);
router.get("/profile/retrieval", getProfile);
router.get("/checkAdmin", checkAdmin)
router.post("/register", register);
router.post("/login", login);
router.post("/fuel-quote", quote);
router.get("/fuel-quote-history", getFuelHistory)
router.get("/all-fuel-quote-history", getAllFuelHistory);

module.exports = router;