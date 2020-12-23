const express = require('express');
const morgan = require('morgan');

//Import sub-routers
const {BASE: MINIONS, minionsRouter} = require('./minionsRouter.js');
const {BASE: MEETINGS, meetingsRouter} = require('./meetingsRouter.js');
const {BASE: IDEAS, ideasRouter} = require('./ideasRouter.js');

const apiRouter = express.Router();
apiRouter.use(morgan('tiny'));


//Debugging
apiRouter.use('/', (req, res, next) =>{
    console.log('MINIONS: '+MINIONS);
    console.log('MEETINGS: '+MEETINGS);
    console.log('IDEAS: '+IDEAS);
})

//Required Routes

//  /api/minions
apiRouter.use('/minions', minionsRouter);

// GET /api/minions to get an array of all minions.
// POST /api/minions to create a new minion and save it to the database.
// GET /api/minions/:minionId to get a single minion by id.
// PUT /api/minions/:minionId to update a single minion by id.
// DELETE /api/minions/:minionId to delete a single minion by id.


//  /api/ideas
apiRouter.use('/ideas', ideasRouter);

// GET /api/ideas to get an array of all ideas.
// POST /api/ideas to create a new idea and save it to the database.
// GET /api/ideas/:ideaId to get a single idea by id.
// PUT /api/ideas/:ideaId to update a single idea by id.
// DELETE /api/ideas/:ideaId to delete a single idea by id.


//  /api/meetings
apiRouter.use('/meetings', meetingsRouter);

// GET /api/meetings to get an array of all meetings.
// POST /api/meetings to create a new meeting and save it to the database.
// DELETE /api/meetings to delete all meetings from the database.


module.exports = apiRouter;



