const express = require('express');

const db = require('../db.js');

meetingsRouter = express.Router();

meetingsRouter.use('/', (req, res, next) => {
    const allMeetings = db.getAllFromDatabase('meetings');
    req.allMeetings = allMeetings;
    next();
});

meetingsRouter.get('/', (req, res, next) => {
    const meetings = db.getAllFromDatabase('meetings');
    res.status(200).send(meetings);
});

meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = db.createMeeting();
    req.allMeetings.push(newMeeting);
    res.status(201).send(newMeeting);
});

meetingsRouter.delete('/', (req, res, next) => {
    const deleted = db.deleteAllFromDatabase('meetings');
    if(!deleted) {
        res.status(500).send();
    } else {
        res.status(204).send();
    }
});

module.exports = meetingsRouter;