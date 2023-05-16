const router = require("express").Router();
const userController = require("../controllers/UserController");

router
	.route("/")
	.get(userController.getAllUsers)
	.post(userController.addUser);
router
	.route("/:id")
	.put(userController.updateProfile)
	.get(userController.getProfile)
	.delete(userController.deleteUser);

router.route("/:id/history_coms").get(userController.getHisComs);
router.route("/:id/history_reqs").get(userController.getHisReqs);

module.exports = router;