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
    const {name, becameClientDate, category, users} = req.body;
    console.log(req.payload)
    const user = req.payload
    Company.create({ name, owner: user._id, becameClientDate, category, users})
      .then((response) => res.status(201).json(response))
      .catch((err) => res.json(err));
  });

  //Get all companies

  router.get('/companies', (req, res, next) => {
   
    Company.find()
    .populate('users')
    .populate('owner')
    .then((companies) => {
        console.log(companies)
        res.status(200).json(companies)})
    .catch((err) => res.json(err));
  });

  //Edit Company (FOR HELPGUARD CUSTOMERS)

  router.put('/companies/:companyId', async (req, res, next) => {
    try {
      const { companyId } = req.params;
      const { name, owner, users, category, teams} = req.body;

      const company = await Company.findByIdAndUpdate(companyId, {name, owner, users, category, teams}, { new: true });
      
      await  User.findByIdAndUpdate(owner, {$push: {assignedCompanies: company._id}});
      
      await company.users.map((user) => { User.findByIdAndUpdate(user, {$push: {company: companyId}});})
      

      res.status(201).json(company)
    } catch (error) {
      next(error)
    }
  });

  // Get all Company Users (Users & Client)

  router.get('/all-users', async (req, res, next) => {
    try {
      const allUsers = await User.find();
      const allClients = await Client.find()
      const merge = (first, second) => {
  for(let i=0; i<second.length; i++) {
    first.push(second[i]);
  }
  return first;
}
      const users = merge(allUsers, allClients)

      res.status(200).json(users)
    } catch (error) {
      next(error)
    }
    
  })

  //Delete Company

  router.delete('/companies/:companyId', (req, res, next) => {
    const { companyId } = req.params;
  
    Company.findByIdAndRemove(companyId)
      .then(() =>
        res.status(200).json({ message: `The project with id ${companyId} was successfully deleted` })
      )
      .catch((err) => res.json(err));
  });



  module.exports = router;