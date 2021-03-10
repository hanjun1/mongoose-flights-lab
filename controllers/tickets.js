module.exports = {
  new: newTicket,
  create,
};

const Flight = require("../models/flight");
const Ticket = require("../models/ticket");

async function newTicket(req, res) {
  try {
    let flight = await Flight.findById(req.params.flightId);
    res.render("tickets/new", { flight });
  } catch (e) {
    res.render("error");
  }
}

async function create(req, res) {
  try {
    await Ticket.create(req.body);
    res.redirect(`/flights/${req.params.flightId}`);
  } catch (e) {
    res.send(e);
  }
}
