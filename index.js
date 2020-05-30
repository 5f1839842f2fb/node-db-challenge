const express = require('express');

const server = express();

const db = require('./data/db')

server.use(express.json());

const validateId = (req, res, next) => {
  db('projects').where({ id: req.body.id})
  .then(response => {
    if (response.length !== 0) {
      next()
    } else {
      res.status(400).json({ message: "invalid id" })
    }
  })
}

server.get('/:url', (req, res) => {
  db(req.params.url).then(response => res.status(200).send(response))
})

server.post('/', (req, res) => {
  if (!("name" in req.body)) {
    res.status(400).json({ message: "name field required"})
  }
})

server.post('/tasks', validateId)
server.post('/resources', validateId)

server.post('/projects', (req, res) => {
  db('projects').insert(req.body).then(response => res.status(200).send(response))
  .catch(error => {
    res.status(400).send(error)
  })
})

server.post('/tasks', (req, res) => {
  if (!("description" in req.body)) {
    res.status(400).send("description and project_id fields required")
  } else {
    db('tasks').insert(req.body).then(response => res.status(200).send(response))
    .catch(error => {
      res.status(400).send(error)
    })
  }
})

server.post('/resources', (req, res) => {
  if (!("project_id" in req.body)) {
    res.status(400).send("description and project_id fields required")
  } else {
    db('resources').insert(req.body).then(response => res.status(200).send(response))
    .catch(error => {
      res.status(400).send(error)
    })
  }
})

server.listen(3000, () => {
  console.log('listening on 3000');
});