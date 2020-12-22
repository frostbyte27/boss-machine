const express = require('express');
const morgan = require('morgan');
const ideasRouter = express.Router();
ideasRouter.use(morgan('tiny'));

//Required Routes

const BASE = '/ideas';

// GET /api/ideas to get an array of all ideas.
ideasRouter.get('/', (req, res, next) => {
    console.log('Get all ideas');
});

// POST /api/ideas to create a new idea and save it to the database.
ideasRouter.post('/', (req, res, next) => {
    console.log('Create an idea');
});



//-----------Using Paremeter ideadId --------

// GET /api/ideas/:ideaId to get a single idea by id.
ideasRouter.get('/:ideaId', (req, res, next) => {
    console.log('Get idea, id: '+req.params.ideaId);
});

// PUT /api/ideas/:ideaId to update a single idea by id.
ideasRouter.put('/:ideaId', (req, res, next) => {
    console.log('Edit idea, id: '+req.params.ideaId);
});

// DELETE /api/ideas/:ideaId to delete a single idea by id.
ideasRouter.delete('/:ideaId', (req, res, next) => {
    console.log('Delete idea, id: '+req.params.ideaId);
});

module.exports = { BASE, ideasRouter};