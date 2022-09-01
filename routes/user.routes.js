const router = require("express").Router();
const axios = require('axios').default;
const hubspot = require('@hubspot/api-client')


const hubspotClient = new hubspot.Client({ accessToken: process.env.HUBSPOT_TOKEN })



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


router.get('/users', async (req, res, next) => {

  try{

   const users = await User.find()
  .populate('assigned')
  .populate('assignedCompanies')
  .populate('owner')
  .populate('company')

  const hubspotData = await axios.get('https://api.hubapi.com/crm/v3/objects/contacts',
  {
    headers: {
      'Authorization': `Bearer ${process.env.HUBSPOT_TOKEN}`,
      'Content-Type': 'application/json'
    }
  },
  (err, data) => {
    console.log(hubspotData)
    // Handle the API response
  }
);

  res.status(200).json(users)

  }
  catch(err){
        res.json(err)
    }
    
   
  });

//Create a User (Client)

router.post('/users', (req, res, next) => {
    const {name, lastName, email, telephone, owner, company, role} = req.body;
    
    const user = req.payload;
    console.log(req.payload);
    User.create({ name, owner: owner._id, lastName, email, telephone, company, role})
      .then((response) => res.status(201).json(response))
      .catch((err) => res.json(err));
  });

  //Edit User

  router.put('/users/:userId', async (req, res, next) => {
    const { userId } = req.params;
    const { name, lastName, owner, email, telephone, 
        assignedCompanies, assigned, role, persona, category, 
    hgEmployee, company} = req.body;
  
    try {
    
       let response =  await User.findByIdAndUpdate(userId, {name, lastName, owner, email, telephone, 
            assignedCompanies, assigned, role, persona, category, 
        hgEmployee, company}, { new: true })

        await User.findByIdAndUpdate(owner, {$push: {assigned: response._id}});

        await Company.findByIdAndUpdate(company, {$push: {users: response._id}});

        res.status(201).json(response)

        
    } catch(err){
        res.json(err)
    }
    
    
  });

// Calling Hubspot CRM API - Get all Contacts



  



  module.exports = router;

