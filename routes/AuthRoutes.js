const router = require("express").Router();
const AuthController = require("../controllers/AuthController");

router
	.route("/:username/:password")
	.get(AuthController.getUser);

module.exports = router;