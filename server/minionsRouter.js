const express = require('express');
const morgan = require('morgan');
const minionsRouter = express.Router();
minionsRouter.use(morgan('tiny'));

//Required Routes

const BASE = '/minions';

// GET /api/minions to get an array of all minions.
minionsRouter.get('/', (req, res, next) => {
    console.log('Get all minions');
});


// POST /api/minions to create a new minion and save it to the database.
minionsRouter.post('/', (req, res, next) => {
    console.log('Create a minion');
});


//----------Using minionID parameter --------------

//Middleware validation

// GET /api/minions/:minionId to get a single minion by id.
minionsRouter.get('/:minionId', (req, res, next) => {
    console.log('Get specific minion, id: '+req.params.id);
});


// PUT /api/minions/:minionId to update a single minion by id.
minionsRouter.put('/:minionId', (req, res, next) => {
    console.log('Edit specific minion, id: '+req.params.id);
});

// DELETE /api/minions/:minionId to delete a single minion by id.
minionsRouter.delete('/:minionId', (req, res, next) => {
    console.log('Delete specific minion, id: '+req.params.id);
});

module.exports = { BASE, minionsRouter};



