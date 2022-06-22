// Import NPM Pkgs
require('dotenv').config();
const axios = require('axios');

// Import ENV vars
const kgKey = process.env.kgKey || null;
const acUrl = process.env.acUrl || null

module.exports = {

    AutoLookup: async (req, res) => {
        // Validate request
        // Make sure that the kgKey matches the env kgKey
        if(req.query.kgKey != kgKey) return res.status(401).send('Not authorized');
        // Check to see if it is a GET Req
        if(req.method != 'GET') return res.status(401).send('Not authorized');
    }

}