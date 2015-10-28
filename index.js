'use strict'
// Description:
//   Use the Domainr API to check for available domains given a term.
//
// Dependencies:
//   "request" : "^2.65.0",
//
// Configuration:
//   HUBOT_MASHAPE_KEY - Your Mashape API key for Domainr
//
// Commands:
//   hubot domain [me] search_term - Search for a domain or domain hack
//
// Author:
//   passcod

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
        const search_term =  msg.match[1].trim()
        request(api_url + search_term, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                const data = JSON.parse(body)
                const reply = data.results.map(result => `${symbolize(result.availability)} ${result.domain}`)
                msg.reply(reply.join('\n'))
            } else {
                msg.reply('Uh-oh. Something went wrong.')
                console.log('ERR:', 'hubot-domain:', error)
            }
        })
    })
}
