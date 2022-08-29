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

// Create Company

router.post('/companies', (req, res, next) => {
    const {name, owner, becameClientDate, category} = req.body;
  
    Company.create({ name, owner, becameClientDate, category})
      .then((response) => res.status(201).json(response))
      .catch((err) => res.json(err));
  });

  //Get all companies

  router.get('/companies', (req, res, next) => {
   
  
    Company.find()
    .populate('users')
    .populate('owner')
    .then((companies) => res.status(200).json(companies))
    .catch((err) => res.json(err));
  });

  //Edit Company (FOR HELPGUARD CUSTOMERS)

  router.put('/companies/:companyId', (req, res, next) => {
    const { companyId } = req.params;
    const { name, owner, users, category, teams} = req.body;
  
    Company.findByIdAndUpdate(companyId, {name, owner, users, category, teams}, { new: true })
      .then((company) => {
        res.status(201).json(company)
        // Add company to Agent into assigned Companies

        /* if (!User.findById(owner).assignedCompanies.includes(companyId)) { */
        const updateUser =  User.findByIdAndUpdate(owner, {$push: {assignedCompanies: company._id}});
      /* } */
        console.log(owner)
        return {company, updateUser} 
      })
      .then((company) => {

        //Add company to users working for that company
        company.users.map((user) => {Client.findByIdAndUpdate(user, {$push: {company: companyId}});})
        }) 
      
      .catch((err) => res.json(err));
  });

  module.exports = router;