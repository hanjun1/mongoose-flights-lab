let express = require("express");
let router = express.Router();
let destinationCtrl = require("../controllers/destination");

router.post("/flights/:id/destination", destinationCtrl.create);
router.delete("/flights/:id/destination/:destId", destinationCtrl.delete);

module.exports = router;
