const Flight = require('../models/flight')
const Ticket = require('../models/ticket')

module.exports = {
    new: newTicket,
    create
}

async function create(req, res) {
    const flight = await Flight.findById(req.params.id);
    try {
        await Ticket.create({ ...req.body, flight: flight._id });
    } catch(err) {
        console.log(err)
    }
    res.redirect(`/flights/${flight._id}`);
}

async function newTicket(req, res) {
    const flight = await Flight.findById(req.params.id);
    try {
        const tickets = await Ticket.find({ flight: flight._id });
        res.render('tickets/new', { title: 'Create Ticket', tickets, flight})
    } catch(err) {
        console.log(err)
    }
}