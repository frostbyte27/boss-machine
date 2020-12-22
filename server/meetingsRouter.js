const express = require('express');
const morgan = require('morgan');
const meetingsRouter = express.Router();
meetingsRouter.use(morgan('tiny'));

//Required Routes

const BASE = '/meetings';

// GET /api/meetings to get an array of all meetings.
meetingsRouter.get('/', (req, res, next) => {
    console.log('Get all meetings');
});

// POST /api/meetings to create a new meeting and save it to the database.
meetingsRouter.post('/', (req, res, next) => {
    console.log('Create a meeting');
});

// DELETE /api/meetings to delete all meetings from the database.
meetingsRouter.delete('/', (req, res, next) => {
    console.log('Delete all meetings');
});


module.exports = { BASE, meetingsRouter};



