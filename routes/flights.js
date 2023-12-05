const express = require('express');
const router = express.Router();
const flightsCtrl = require('../controllers/flights');

/* GET flights listing. */
router.get('/', flightsCtrl.index);
// GET /flights/new
router.get('/new', flightsCtrl.new);
// GET /flights/:id (show func) (must be below NEW)
router.get('/:id', flightsCtrl.show);
// POST /flights
router.post('/', flightsCtrl.create);


module.exports = router;
