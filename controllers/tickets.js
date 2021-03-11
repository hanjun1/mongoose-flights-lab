module.exports = {
  new: newTicket,
  create,
  delete: deleteTicket,
};

const Flight = require("../models/flight");
const Ticket = require("../models/ticket");

async function newTicket(req, res) {
  try {
    let flight = await Flight.findById(req.params.flightId);
    res.render("tickets/new", { flight });
  } catch (e) {
    res.render("error", {
      message: "There's an error!",
      error: e,
    });
  }
}

async function create(req, res) {
  try {
    await Ticket.create(req.body);
    res.redirect(`/flights/${req.params.flightId}`);
  } catch (e) {
    res.render("error", {
      message: "There's an error!",
      error: e,
    });
  }
}

async function deleteTicket(req, res) {
  try {
    await Ticket.findByIdAndDelete(req.params.ticketId);
    res.redirect(`/flights/${req.params.flightId}`);
  } catch (e) {
    res.render("error", {
      message: "There's an error!",
      error: e,
    });
  }
}
