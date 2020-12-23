const express = require('express');
const morgan = require('morgan');
const db = require('./db');
const minionsRouter = express.Router();
minionsRouter.use(morgan('tiny'));

//Required Routes

const BASE = '/minions';

// GET /api/minions to get an array of all minions.
minionsRouter.get('/', (req, res, next) => {
    console.log('Get all minions');
    let minions = db.getAllFromDatabase('minions');
    console.log(minions);

    //Send response
    res.status(200).send(minions);
});


// POST /api/minions to create a new minion and save it to the database.
minionsRouter.post('/', (req, res, next) => {
    console.log('Create a minion');

    //TODO: Validate
    console.log(req.body);
    
    //Add
    db.addToDatabase('minions', req.body);

    //Send response
    res.status(201).send()
});


//----------Using minionID parameter --------------

//Middleware validation

// GET /api/minions/:minionId to get a single minion by id.
minionsRouter.get('/:minionId', (req, res, next) => {
    console.log('Get specific minion, id: '+req.params.id);

    //Validate

    //get from database
    let minion = db.getFromDatabaseById('minions', req.params.id);
    if(!minion){
        res.status(404).send();
    }

    //send back
    res.status()
});


// PUT /api/minions/:minionId to update a single minion by id.
minionsRouter.put('/:minionId', (req, res, next) => {
    console.log('Edit specific minion, id: '+req.params.id);
    //get instance
    let minion = db.getFromDatabaseById('minions, req.params.id');
    //update instance
    if(!db.updateInstanceInDatabase('minions', minion)){
        //Unable to find in database
        res.status(404).send();
    }

    //Send response - Success response
    res.status(201).send()

});

// DELETE /api/minions/:minionId to delete a single minion by id.
minionsRouter.delete('/:minionId', (req, res, next) => {
    console.log('Delete specific minion, id: '+req.params.id);
    
    if(!db.deleteFromDatabasebyId('minions', req.params.id)){
        //Unable to find in database
        res.status(404).send();
    }

    //Send response - Success response
    res.status(200).send();
});

module.exports = { BASE, minionsRouter};



