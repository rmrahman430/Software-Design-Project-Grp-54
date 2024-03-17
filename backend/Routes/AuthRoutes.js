const { register, login, profile } = require("../Controllers/AuthControllers");
const { checkUser } = require("../Middlewares/AuthMiddlewares");

const router = require("express").Router();

router.post("/profile", checkUser);
router.post("/profile/update", profile);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
