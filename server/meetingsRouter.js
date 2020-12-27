const express = require('express');
const morgan = require('morgan');
const db = require('./db');
const meetingsRouter = express.Router();
//meetingsRouter.use(morgan('tiny'));

//Required Routes

const BASE = '/meetings';
const DB_MODEL = 'meetings'

// GET /api/meetings to get an array of all meetings.
meetingsRouter.get('/', (req, res, next) => {
    console.log('Get all meetings');
    let meetings = db.getAllFromDatabase(DB_MODEL);
    
    if(!meetings){
        res.status(404).send();
    }
    console.log(meetings);

    //Send response
    res.status(200).send(meetings);
});

// POST /api/meetings to create a new meeting and save it to the database.
meetingsRouter.post('/', (req, res, next) => {
    console.log('Create a meeting');

    //TODO: Validate
    console.log(req.body);
    //Add
    db.addToDatabase(DB_MODEL, req.body);
    //Send response
    res.status(201).send();

});

// DELETE /api/meetings to delete all meetings from the database.
meetingsRouter.delete('/', (req, res, next) => {
    console.log('Delete all meetings');

    if(db.deleteAllFromDatabase(DB_MODEL).length > 0){
        //No model with specified name found
        res.status(400).send();
    }
    //Successfully removed entries
    res.status(201).send();

});


module.exports = { BASE, meetingsRouter};



