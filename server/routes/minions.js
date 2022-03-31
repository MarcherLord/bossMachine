const express = require('express');

const db = require('../db.js')

minionsRouter = express.Router();

minionsRouter.param('minionId', (req, res, next, id) => {
    foundMinion = db.getFromDatabaseById('minions', id);
    if(!foundMinion) {
        res.status(404).send();
    } else {
        req.minion = foundMinion;
        req.id = id;
        next();
    }
});

minionsRouter.get('/', (req, res, next) => {
    res.status(200).send(db.getAllFromDatabase('minions'))
});

minionsRouter.post('/', (req, res, next) => {
    const savedMinion = db.addToDatabase('minions', req.body);
    res.status(201).send(savedMinion); 
});

minionsRouter.get('/:minionId', (req, res, next) =>{
    res.status(200).send(req.minion)
});

minionsRouter.put('/:minionId', (req, res, next) => {
    const updatedMinion = db.updateInstanceInDatabase('minions', req.body);
    res.status(200).send(updatedMinion);
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    const deletedMinion = db.deleteFromDatabasebyId('minions', req.id);
    if(!deletedMinion) {
        res.status(500).send();
    } else {
        res.status(204).send();
    }
});

module.exports = minionsRouter;