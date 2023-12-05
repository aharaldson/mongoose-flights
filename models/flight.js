const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const destinationSchema = new Schema ({
    //  DESTINATION
    destination: {
        type: String,
        enum: ['ORD', 'DFW', 'SAN', 'SEA', 'MCO'],
        default: '',
    },
    arrival: {
        type: Date,
    }
});

const flightSchema = new Schema({
    airline: { 
        type: String,
        enum: ['Delta', 'United', 'American', 'Southwest'],
        default: ''
    },
    // ORIGIN
    airport: {
        type: String,
        enum: ['AUS', 'DEN', 'LAX', 'PHX', 'JFK'],
        default: 'DEN'
    },
    // FLIGHT NUMBER
    flightNo: {
        type: Number,
        required: true,
        minimum: 10,
        maximum: 9999 
    },
    // DEPARTURE DATE
    departs: { 
        type: Date,
        default: function () {
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth();
            const day = today.getDate();
            const finalDate = new Date(year, month, day + 365);
            return finalDate;
           }
    },
    destinations: [destinationSchema]
});


module.exports = mongoose.model('Flight', flightSchema);