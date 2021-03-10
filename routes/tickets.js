let express = require("express");
let router = express.Router();

let ticketsCtrl = require("../controllers/tickets");

router.get("/flights/:flightId/ticket/new", ticketsCtrl.new);
router.post("/flights/:flightId/ticket", ticketsCtrl.create);

module.exports = router;
