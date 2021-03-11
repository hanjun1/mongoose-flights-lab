module.exports = {
  create,
  delete: deleteDestination,
};

let Flight = require("../models/flight");

async function create(req, res) {
  try {
    let flight = await Flight.findById(req.params.id);
    flight.destinations.push(req.body);
    flight.destinations.sort((a, b) => {
      if (a.arrival > b.arrival) return 1;
      else return -1;
    });
    await flight.save();
    res.redirect(`/flights/${req.params.id}`);
  } catch (e) {
    res.render("error", {
      message: "There's an error!",
      error: e,
    });
  }
}

async function deleteDestination(req, res) {
  try {
    let flight = await Flight.findById(req.params.id);
    for (let i = 0; i < flight.destinations.length; i++) {
      if (flight.destinations[i].id === req.params.destId) {
        await flight.destinations[i].remove();
        break;
      }
    }
    await flight.save();
    res.redirect(`/flights/${req.params.id}`);
  } catch (e) {
    res.render("error", {
      message: "There's an error!",
      error: e,
    });
  }
}
