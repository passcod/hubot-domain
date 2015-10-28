'use strict'
// Description:
//   Your bot learns to use the Domainr API to check available domains related to a given word.
//
// Dependencies:
//   "request" : "^2.4.1",
//   "lodash" : "^2.48.0"
//
// Configuration:
//   HUBOT_MASHAPE_KEY - Your Mashape API key for Domainr
//
// Commands:
//   hubot domain [me] your_search_word - Search for a domain or domain hack
//
// Author:
//   passcod

const _ = require('lodash')
const request = require('request')

const api_key = process.env.HUBOT_MASHAPE_KEY
const api_url = `https://domainr.p.mashape.com/v1/search/?mashape-key=${api_key}&q=`

const symbols = {
    available: '✓',
    taken: '✗',
    maybe: '❓'
}

const avails = Object.keys(symbols)

function symbolize (availability) {
    if (avails.indexOf(availability) === -1) {
        availability = 'maybe'
    }

    return symbols[availability]
}

module.exports = function (robot) {
    robot.respond(/domain(?: me)?(?: (.*))/i, function (msg) {
        const search_term =  msg.match[2].trim()
        request(api_url + search_term, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                const data = JSON.parse(body)
                let reply = ''

                _.each(data.results, function(result) {
                    reply += `${symbolize(result.availability)} ${result.domain}\n`;
                });

                msg.reply(reply);
            } else {
                msg.reply('Something went wrong. Grep your logs for hubot-domainr to find the ugly details.');
                console.log('hubot-domainr got the following error: \n', error);
            }
        });
    });
};
