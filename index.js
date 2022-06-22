// Import NPM Pkgs
require('dotenv').config();
const axios = require('axios');
const _ = require('underscore');

// Import ENV vars
const kgKey = process.env.kgKey || null;
const acUrl = process.env.acUrl || null;
const acApiToken = process.env.acApiToken || null;

module.exports = {

    autoLookup: async (req, res) => {
        // Validate request
        // Make sure that the kgKey matches the env kgKey
        if(req.query.kgKey != kgKey) return res.status(401).send('Not authorized');
        // Check to see if it is a GET Req
        if(req.method != 'GET') return res.status(401).send('Not authorized');
        // Check to see if the AC ID is present
        if(!req.query.acId) return res.status(401).send('Not authorized');

        // Config the API Req
        var axiosConfig = {
            method: 'get',
            url: `${acUrl}/api/3/automations?limit=100`,
            headers: { 
              'Api-Token': acApiToken, 
            }
        };

        // Send the request to AC
        let acAutoResults = await axios.request(axiosConfig);

        // Find the matching automation data
        let acAutomation = _.findWhere(acAutoResults.automations, {id: req.query.acId})

        // Return data
        return res.status(200).json({acAutomation, status: 200});
    }

}