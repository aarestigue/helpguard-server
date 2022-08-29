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


//Get all users


router.get('/users', (req, res, next) => {
   
  
    User.find()
    .populate('assigned')
    .populate('assignedCompanies')
    .populate('owner')
    .populate('company')
    .then((companies) => res.status(200).json(companies))
    .catch((err) => res.json(err));
  });

  //Edit User

  router.put('/users/:userId', (req, res, next) => {
    const { userId } = req.params;
    const { name, lastName, owner, email, telephone, 
        assignedCompanies, assigned, role, persona, category, 
    hgEmployee, company} = req.body;
  
    User.findByIdAndUpdate(userId, {name, lastName, owner, email, telephone, 
        assignedCompanies, assigned, role, persona, category, 
    hgEmployee, company}, { new: true })
      .then((user) => {
        res.status(201).json(user)
        // Add company to Agent into assigned Companies

        /* if (!User.findById(owner).assignedCompanies.includes(companyId)) { */
        /* const findOwner = User.findById(owner);
        const update = findOwner.updateOne({$push: {assigned: user._id}}) */
        const updateOwner = User.findByIdAndUpdate(owner, {$push: {assigned: user._id}});
      /* } */
        
        return {updateOwner, user} 
      })
      .then((user) => {
        
        //Add company to users working for that company
        return Company.findByIdAndUpdate(company, {$push: {users: user._id}});
        })
       
      
      .catch((err) => res.json(err));
  });

  module.exports = router;

