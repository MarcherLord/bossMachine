const express = require('express');

const db = require('../db.js');

const checkMillionDollarIdea = require('../checkMillionDollarIdea');

ideasRouter = express.Router();

ideasRouter.param('ideaId', (req, res, next, id) => {
    foundIdea = db.getFromDatabaseById('ideas', id);
    if (!foundIdea) {
        res.status(404).send();
    } else {
        req.idea = foundIdea;
        req.id = id;
        next();
    }
});

ideasRouter.get('/', (req, res, next) => {
    foundIdeas = db.getAllFromDatabase('ideas');
    res.status(200).send(foundIdeas);
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const savedIdea = db.addToDatabase('ideas', req.body);
    res.status(201).send(savedIdea);
});

ideasRouter.get('/:ideaId', (req, res, next) => {
    res.status(200).send(req.idea);
});

ideasRouter.put('/:ideaId', (req, res, next) => {
    const updatedIdea = db.updateInstanceInDatabase('ideas', req.body);
    res.status(200).send(updatedIdea);
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deletedIdea = db.deleteFromDatabasebyId('ideas', req.id);
    if(!deletedIdea) {
        res.status(500).send();
    } else {
        res.status(204).send();
    }
});

module.exports = ideasRouter;