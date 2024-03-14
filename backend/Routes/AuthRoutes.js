const { register, login } = require("../Controllers/Authcontrollers");
const { checkUser } = require("../Middlewares/AuthMiddlewares");

const router = require("express").Router();

router.post("/profile", checkUser);
router.post("/register", register);
router.post("/login", login);

module.exports = router;