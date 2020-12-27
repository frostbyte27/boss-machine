const express = require('express');
const morgan = require('morgan');
const db = require('./db');
const ideasRouter = express.Router();
//ideasRouter.use(morgan('tiny'));

//Required Routes

const BASE = '/ideas';
const DB_MODEL = 'ideas';

// GET /api/ideas to get an array of all ideas.
ideasRouter.get('/', (req, res, next) => {
    // console.log('Get all ideas');
    let ideas = db.getAllFromDatabase(DB_MODEL);
    // console.log(ideas);
    if(!ideas){
        res.status(404).send();
    }
    //Send response
    res.status(200).send(ideas);
});

// POST /api/ideas to create a new idea and save it to the database.
ideasRouter.post('/', (req, res, next) => {
    // console.log('Create an idea');
    // console.log(req.body);
    
    //Add new instance - performs validation
    let updatedIdea = db.addToDatabase(DB_MODEL, req.body);
    if(!updatedIdea){
        //Unable to find in database
        res.status(404).send();
        return;
    }

    //Send response - Success response
    res.status(201).send(updatedIdea);
});



//-----------Using Paremeter ideadId --------

ideasRouter.param('ideaId', (req, res, next, ideaId) => {
    //console.log('Attempting to access idea with id: '+ideaId);
    let idea = db.getFromDatabaseById(DB_MODEL, ideaId);
    if(!idea){
        //console.log('Idea(id= '+ideaId+") not found in database");
        res.status(404).send();
        return;
    }
    req.idea = idea;
    // console.log('Accessed Idea: '+req.idea);
    next();
});

// GET /api/ideas/:ideaId to get a single idea by id.
ideasRouter.get('/:ideaId', (req, res, next) => {
    //console.log('Get idea, id: '+req.params.ideaId);
    
    //send back
    res.status(200).send(req.idea);
});

// PUT /api/ideas/:ideaId to update a single idea by id.
ideasRouter.put('/:ideaId', (req, res, next) => {
    //console.log('Edit idea, id: '+req.idea.id);

    //update instance
    let newIdea = req.body;
    newIdea.id = req.idea.id;
    let updatedIdea = db.updateInstanceInDatabase(DB_MODEL, newIdea);
    if(!updatedIdea){
        //Unable to find in database
        res.status(404).send();
    }

    //Send response - Success response
    res.status(201).send(updatedIdea);
});


// DELETE /api/ideas/:ideaId to delete a single idea by id.
ideasRouter.delete('/:ideaId', (req, res, next) => {
    //console.log('Delete idea, id: '+req.idea.id);
     
    if(!db.deleteFromDatabasebyId(DB_MODEL, req.idea.id)){
        //Unable to find in database
        //console.log('\t\tNot found');
        res.status(404).send();
    }

    //Send response - Success response
    //console.log('Found and deleted idea, id: '+req.idea.id);
    res.status(204).send();
});

module.exports = { BASE, ideasRouter};