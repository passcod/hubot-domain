#Hubot-domainr
Hubot-domainr is a simple Hubot script that enables your bot to quickly check available domains related to a given word.

## Installing
Add hubot-domainr to your Hubots external-scripts.json and install it with:

`npm install hubot-domainr --save`

You also need to configure DOMAINR_CLIENT_ID environment variable. Check [Domainr API doc](https://github.com/domainr/api) for latest info on the client_id.

## Usage
After adding the script to your Hubot you’ll have the following command available:

hubot (domainr|dmnr) your_search_string
