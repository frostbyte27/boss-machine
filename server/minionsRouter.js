const express = require('express');
const morgan = require('morgan');
const db = require('./db');
const minionsRouter = express.Router();
//minionsRouter.use(morgan('tiny'));

//Required Routes

const BASE = '/minions';
const DB_MODEL = 'minions';

// GET /api/minions to get an array of all minions.
minionsRouter.get('/', (req, res, next) => {
    console.log('Get all minions');
    let minions = db.getAllFromDatabase(DB_MODEL);
    //console.log(minions);
    //Minions data model not found
    if(!minions){
        res.status(404).send();
    }

    //Send response
    res.status(200).send(minions);
});


// POST /api/minions to create a new minion and save it to the database.
minionsRouter.post('/', (req, res, next) => {
    console.log('Create a minion');

    //TODO: Validate
    console.log(req.body);
 
    
    //Add
    let newMinion = db.addToDatabase(DB_MODEL, req.body);
    if(!newMinion){
        console.log('Failed to add new minion');
        res.status(400).send();
    }
    console.log('Successfully added new minion');
    //Success
    res.status(201).send(newMinion);
});


//----------Using minionID parameter --------------

//Middleware for getting minion from id
minionsRouter.param('minionId', (req, res, next, id) => {
    //attempt to get minion - also validates ID

    //get from database
    let minion = db.getFromDatabaseById(DB_MODEL, id);
    if(!minion){
        console.log('Failed to find minion with id: '+id);
        res.status(404).send();
        return;
    }
    //Success!
    req.minion = minion;
    next();
})

// GET /api/minions/:minionId to get a single minion by id.
minionsRouter.get('/:minionId', (req, res, next) => {
    console.log('Get specific minion, id: '+req.minion.id);
    console.log(req.minion);
    //send back
    res.status(200).send(req.minion);
});


// PUT /api/minions/:minionId to update a single minion by id.
minionsRouter.put('/:minionId', (req, res, next) => {
    console.log('Edit specific minion, id: '+req.minion.id);
 
    //update instance
    let updatedMinion = db.updateInstanceInDatabase(DB_MODEL, req.body);
    if(!updatedMinion){
        //Unable to find in database
        res.status(404).send();
    }
    console.log('Updated Minion: ');
    console.log(updatedMinion);
    //Send response - Success response
    res.status(201).send(updatedMinion);

});

// DELETE /api/minions/:minionId to delete a single minion by id.
minionsRouter.delete('/:minionId', (req, res, next) => {
    console.log('Delete specific minion, id: '+req.minion.id);
    
    if(!db.deleteFromDatabasebyId(DB_MODEL, req.minion.id)){
        //Unable to find in database
        res.status(404).send();
    }

    //Send response - Success response
    res.status(204).send();
});

module.exports = { BASE, minionsRouter};



