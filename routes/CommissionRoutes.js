const router = require("express").Router();
const commissionController = require("../controllers/CommissionController");

router
	.route("/")
	.get(commissionController.getAllCommissions)
	.post(commissionController.addCommission);

router.route("/available").get(commissionController.getAvaCom);

router
	.route("/:id")
	.get(commissionController.getCommission)
	.put(commissionController.updateCommission)
	.delete(commissionController.deleteCommission);

router
	.route("/:id/:helperId")
	.put(commissionController.addHelperToCommission);

module.exports = router;