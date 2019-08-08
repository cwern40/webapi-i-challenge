// implement your API here

const express = require('express');

const db = require('./data/db')

const server = express();

server.use(express.json());

//Get request to get all of the users
server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'The users information could not be retrieved.'
            })
        })
})

//Get request to get a specific user
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;

    db.findById(id)
        .then(user =>{
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist.'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'The user information could not be retrieved.'
            })
        })
})

//Post request to create a new user
server.post('/api/users', (req, res) => {
    const newUser = req.body;

    if (!newUser.bio || !newUser.name) {
        res.status(400).json({
            message: 'Please provide name and bio for the user.'
        })
    } else {
    db.insert(newUser)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'There was an error while saving the user to the database'
                })
            });
    }
})

//Delete request to delete a user.
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;

    db.remove(id)
        .then(deleteUser => {
            if (deleteUser) {
                res.json(deleteUser)
            } else {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist.'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'The user could not be removed'
            })
        })
})

//Put request to update a user.
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    if (!changes.name || !changes.bio) {
        res.status(400).json({
            message: 'Please provide name and bio for the user.'
        })
    } else {
    db.update(id, changes)
        .then(updated => {
            if (updated) {
                res.json(updated)
            } else {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist.'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'The user information could not be modified.'
            })
        })
    }
})

server.listen(4000, () => {
    console.log('server is running on port 4000')
})