module.exports = {
  index,
  new: newFlight,
  create,
};

let Flight = require("../models/flight");

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
  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key];
  }
  await Flight.create(req.body);
  res.redirect("/flights");
}
