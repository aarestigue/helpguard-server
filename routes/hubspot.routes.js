const router = require("express").Router();
const axios = require('axios').default;
const hubspot = require('@hubspot/api-client')
const hubspotAPI = process.env.HUBSPOT_TOKEN



const authRoutes = require("./auth.routes");

axios.get('https://api.hubapi.com/crm/v3/objects/contacts',
  {
    headers: {
      'Authorization': `Bearer ${YOUR_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    }
  },
  (err, data) => {
    // Handle the API response
  }
);