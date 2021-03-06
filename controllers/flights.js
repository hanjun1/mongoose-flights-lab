module.exports = {
  index,
  new: newFlight,
  create,
};

let Flight = require("../models/flight");

function index(req, res) {
  Flight.find({}, function (err, flights) {
    res.render("flights/index", { flights });
  });
}

function newFlight(req, res) {
  res.render("flights/new");
}

async function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key];
  }
  await Flight.create(req.body);
  res.redirect("/flights");
}
