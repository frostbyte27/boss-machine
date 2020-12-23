const express = require('express');
const morgan = require('morgan');
const ideasRouter = express.Router();
ideasRouter.use(morgan('tiny'));

//Required Routes

const BASE = '/ideas';
const DB_MODEL = 'ideas';

// GET /api/ideas to get an array of all ideas.
ideasRouter.get('/', (req, res, next) => {
    console.log('Get all ideas');
    let ideas = db.getAllFromDatabase(DB_MODEL);
    console.log(ideas);
    if(!ideas){
        res.status(404).send();
    }
    //Send response
    res.status(200).send(ideas);
});

// POST /api/ideas to create a new idea and save it to the database.
ideasRouter.post('/', (req, res, next) => {
    console.log('Create an idea');

    //TODO: Validate
    console.log(req.body);
    
    //Add
    db.addToDatabase(DB_MODEL, req.body);

    //Send response
    res.status(201).send();
});



//-----------Using Paremeter ideadId --------

// GET /api/ideas/:ideaId to get a single idea by id.
ideasRouter.get('/:ideaId', (req, res, next) => {
    console.log('Get idea, id: '+req.params.ideaId);

    //Validate

    //get from database
    let minion = db.getFromDatabaseById(DB_MODEL, req.params.id);
    if(!minion){
        res.status(404).send();
    }

    //send back
    res.status()
});

// PUT /api/ideas/:ideaId to update a single idea by id.
ideasRouter.put('/:ideaId', (req, res, next) => {
    console.log('Edit idea, id: '+req.params.ideaId);

    //get instance
    let idea = db.getFromDatabaseById('minions, req.params.id');
    //update instance
    if(!db.updateInstanceInDatabase(DB_MODEL, idea)){
        //Unable to find in database
        res.status(404).send();
    }

    //Send response - Success response
    res.status(201).send()
});

// DELETE /api/ideas/:ideaId to delete a single idea by id.
ideasRouter.delete('/:ideaId', (req, res, next) => {
    console.log('Delete idea, id: '+req.params.ideaId);
     
    if(!db.deleteFromDatabasebyId(DB_MODEL, req.params.id)){
        //Unable to find in database
        res.status(404).send();
    }

    //Send response - Success response
    res.status(200).send();
});

module.exports = { BASE, ideasRouter};