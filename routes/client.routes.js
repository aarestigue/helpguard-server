const router = require("express").Router();
const authRoutes = require("./auth.routes");
const fileUploader = require('../config/cloudinary.config');

const User = require('../models/User.model');
const Company = require('../models/Company.model');
const Team = require('../models/Team.model');
const Ticket = require('../models/Ticket.model');
const Chat = require('../models/Chat.model')
const Client = require('../models/Client.model')
const Task = require('../models/Task.model')

// Create Client

router.post('/clients', (req, res, next) => {
    const { email, name, username, lastName, telephone, owner, company, createDate} = req.body;
  
    Client.create({ email, name, username, lastName, telephone, owner, company, createDate })
      .then((response) => res.status(201).json(response))
      .catch((err) => res.json(err));
  });

// Edit Client

router.put('/clients/:clientId', (req, res, next) => {
  const { clientId } = req.params;
  const { email, name, lastName, telephone, type, owner, company, 
    createDate} = req.body;

  Client.findByIdAndUpdate(clientId, { email, name, lastName, telephone, type, owner, company, 
    createDate}, { new: true })
    .then((client) => {
      res.status(201).json(client)
      const updateUser = User.findByIdAndUpdate(owner, {$push: {assigned: client._id}});
      return {updateUser, client}
    })
    .then((response) => {
      return Company.findByIdAndUpdate(company, {$push: {users: response.client._id}});
    }) 
    
    .catch((err) => res.json(err));
});

// Delete Client

router.delete('/clients/:clientId', (req, res, next) => {
  const { clientId } = req.params;

  Client.findByIdAndRemove(clientId)
    .then(() =>
      res.status(200).json({ message: `The client with id ${clientId} was successfully deleted` })
    )
    .catch((err) => res.json(err));
});





  module.exports = router;