const Flight = require('../models/flight');
const Ticket = require('../models/ticket')

module.exports = {
    index,
    show,
    new: newFlight,
    create
}
async function index(req, res) {
    const flights = await Flight.find({});
    res.render('flights/index', { title: 'All Flights', flights });
}

async function show(req, res) {
    const flight = await Flight.findById(req.params.id);
    const tickets = await Ticket.find({flight: flight._id})
    res.render('flights/show', { title: 'Flight Details', flight, tickets });
}

function newFlight(req, res) {
    res.render('flights/new', {title: 'Add Flight', errorMsg: ''});
}

async function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
      }
      try {
        // Update this line because now we need the _id of the new flight
        const flight = await Flight.create(req.body);
        // Redirect to the new flight's show functionality 
        res.redirect(`/flights/${flight._id}`);
      } catch (err) {
        // Typically some sort of validation error
        console.log(err);
        res.render('flights/new', { errorMsg: err.message });
      }
}