const router = require("express").Router();
const authRoutes = require("./auth.routes");
const fileUploader = require('../config/cloudinary.config');

const User = require('../models/User.model');
const Company = require('../models/Company.model');
const Team = require('../models/Team.model');
const Ticket = require('../models/Ticket.model');
const Chat = require('../models/Chat.model')
const Client = require('../models/Client.model')
const Task = require('../models/Task.model');
const TicketColumn = require("../models/TicketColumn.model");

// Create a ticket


router.post('/tickets', async (req, res, next) => {

    const {subject, description, category, owner, sender, company, statusColumn} = req.body;
    /* console.log(req.payload)
    const sender = req.payload */

    try {

     let newTicket = await  Ticket.create({ sender, subject, description, category, owner, company, statusColumn});
     
     await  User.findByIdAndUpdate(owner, {$push: {tickets: newTicket._id}});

      await User.findByIdAndUpdate(sender, {$push : {tickets: newTicket._id}});
      
      await Company.findByIdAndUpdate(company, {$push: {tickets: newTicket._id}});

     res.status(201).json(newTicket)
    } catch (error) {
        next(error)
      }
     
  });

  //Get all tickets

  router.get('/tickets', (req, res, next) => {
   
    Ticket.find()
    .populate('sender')
    .populate('owner')
    .then((tickets) => {
        console.log(tickets)
        res.status(200).json(tickets)})
    .catch((err) => res.json(err));
  });

  // Ticket detail

  router.get('/tickets/:ticketId', (req, res, next) => {
    
    const {ticketId} = req.params;
    Ticket.findById(ticketId)
    .populate('sender')
    .populate('owner')
    .populate('company')
    .then((ticket) => {
        console.log(ticket)
        res.status(200).json(ticket)})
    .catch((err) => res.json(err));
  });

   // Edit Ticket

   router.put('/tickets/:ticketId', async (req, res, next) => {

    try {
      const { ticketId } = req.params;
      const { sender, subject, description, category, owner, company, statusColumn} = req.body;

      const ticket = await Ticket.findByIdAndUpdate(ticketId, {sender, subject, description, category, owner, company, statusColumn}, { new: true });
      
      await  User.findByIdAndUpdate(owner, {$push: {tickets: ticket._id}});

      await User.findByIdAndUpdate(sender, {$push : {tickets: ticket._id}});
      
      await Company.findByIdAndUpdate(company, {$push: {tickets: ticket._id}});

      await TicketColumn.findByIdAndUpdate(state, {$push: {tickets: ticket._id}});
      

      res.status(201).json(ticket)
    } catch (error) {
      next(error)
    }
  });

  // Delete Ticket

  router.delete('/tickets/:ticketId', (req, res, next) => {
    const { ticketId } = req.params;
  
    Ticket.findByIdAndRemove(ticketId)
      .then(() =>
        res.status(200).json({ message: `The project with id ${ticketId} was successfully deleted` })
      )
      .catch((err) => res.json(err));
  });

  // Create Ticket Column (state)

    router.post('/tickets-states', async (req, res, next) => {

    const {statusName, order} = req.body;
    console.log(req.payload)
    const user = req.payload

    try {

     let newState = await  TicketColumn.create({statusName, order});

     res.status(201).json(newState)
    } catch (error) {
        next(error)
      }
     
  });

  // Get all Ticket Columns (states)

  router.get('/tickets-states', (req, res, next) => {
   
    TicketColumn.find()
    .populate('tickets')
    .then((states) => {
        res.status(200).json(states)})
    .catch((err) => res.json(err));
  });

  // Edit Ticket Columns


  router.put('/tickets-states/:stateId', async (req, res, next) => {

    try {
      const { stateId } = req.params;
      const {statusName, order, tickets} = req.body;

      const ticketState = await TicketColumn.findByIdAndUpdate(stateId, {statusName, order, tickets}, { new: true });
      
      await ticketState.tickets.map((ticket) => { Ticket.findByIdAndUpdate(ticket._id, {$push: {statusColumn: stateId}});})

      res.status(201).json(ticketState)
    } catch (error) {
      next(error)
    }
  });

  // Delete Ticket Columns

  router.delete('/tickets-states/:stateId', (req, res, next) => {
    const { stateId } = req.params;
  
    TicketColumn.findByIdAndRemove(stateId)
      .then(() =>
        res.status(200).json({ message: `The project with id ${stateId} was successfully deleted` })
      )
      .catch((err) => res.json(err));
  });




  module.exports = router;