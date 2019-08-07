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

server.listen(4000, () => {
    console.log('server is running on port 4000')
})