//------------------------------------------------------------------------------
// Copyright IBM Corp. 2017
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.

var Botkit = require('botkit');
require('dotenv').load();


var middleware = require('botkit-middleware-watson')({
    username: process.env.CONVERSATION_USERNAME,
    password: process.env.CONVERSATION_PASSWORD,
    workspace_id: process.env.WORKSPACE_ID,
    version_date: '2017-05-26'
});
var controller = Botkit.facebookbot({
    debug: true,
    log: true,
    access_token: process.env.FACEBOOK_PAGE_TOKEN,
    verify_token: process.env.FACEBOOK_VERIFY_TOKEN,
    app_secret: process.env.FACEBOOK_APP_SECRET,
    validate_requests: true,
    require_appsecret_proof: true
});

var bot = controller.spawn({
});



controller.api.messenger_profile.greeting('Hi, I am Hope!');
controller.api.messenger_profile.get_started('Hi, I am Hope!');

module.exports = function(app) {
    Facebook.controller.middleware.receive.use(middleware.receive);
    Facebook.controller.createWebhookEndpoints(app, Facebook.bot);
    console.log('Facebook bot is live');
    // Customize your Watson Middleware object's before and after callbacks.
    middleware.before = function(message, conversationPayload, callback) {
    callback(null, conversationPayload);
  }

    middleware.after = function(message, conversationResponse, callback) {
    callback(null, conversationResponse);
  }
}

controller.on('message_received', function (bot, message) {
    middleware.interpret(bot, message, function (err) {
        if (message.watsonError) {
            console.log(message.watsonError);
            bot.reply(message, message.watsonError.description || message.watsonError.error);
        } else if (message.watsonData && 'output' in message.watsonData) {
            bot.reply(message, message.watsonData.output.text.join('\n'));
        } else {
            console.log('Error: received message in unknown format. (Is your connection with Watson Conversation up and running?)');
            bot.reply(message, "I'm sorry, but for technical reasons I can't respond to your message");
        }
    });
});



var webserver = require('./server.js')(controller);