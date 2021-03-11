module.exports = {
  index,
  new: newFlight,
  create,
  show,
};

let Flight = require("../models/flight");
let Ticket = require("../models/ticket");

function index(req, res) {
  Flight.find({}, function (err, flights) {
    flights.sort((a, b) => {
      return a.departs - b.departs;
    });
    res.render("flights/index", { flights });
  });
}

function newFlight(req, res) {
  const newFlight = new Flight();
  const dt = newFlight.departs;
  const departsDate = dt.toISOString().slice(0, 16);
  res.render("flights/new", { departsDate });
}

async function create(req, res) {
  try {
    for (let key in req.body) {
      if (req.body[key] === "") delete req.body[key];
    }
    await Flight.create(req.body);
    res.redirect("/flights");
  } catch (e) {
    res.render("error", {
      message: "There's an error!",
      error: e,
    });
  }
}

async function show(req, res) {
  let flight = await Flight.findById(req.params.id);
  let tickets = await Ticket.find({ flight: flight.id });
  res.render("flights/show", { flight, tickets });
}
