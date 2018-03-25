//------------------------------------------------------------------------------
// Copyright IBM Corp. 2017
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.

var Botkit = require('botkit');
require('dotenv').load();
var sharedCode = require('./handleWatsonResponse.js')();

var middleware = require('botkit-middleware-watson')({
    username: process.env.CONVERSATION_USERNAME,
    password: process.env.CONVERSATION_PASSWORD,
    workspace_id: process.env.WORKSPACE_ID,
    version_date: '2016-09-20'
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

var webserver = require('./server.js')(controller);

controller.api.messenger_profile.greeting('Hi, I\'m Hope! I\'m a bot working for Metropolitan Ministries');
controller.api.messenger_profile.get_started('Hi, I\'m Hope! I\'m a bot working for Metropolitan Ministries');

controller.on('message_received', function (bot, message) {
    middleware.interpret(bot, message, function (err) {
        if (!err) {
            sharedCode.handleWatsonResponse(bot, message, 'facebook');
        }
        else {            
            bot.reply(message, "I'm sorry, but for technical reasons I can't respond to your message");
        }
    });
});