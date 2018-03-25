//------------------------------------------------------------------------------
// Copyright IBM Corp. 2017
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.

var request = require('request');

module.exports = function () {
    return {
        "handleWatsonResponse": function (bot, message, clientType) {
            let customFacebookMessage = false;
            let actionToBeInvoked = false;
            if (message.watsonData) {
                if (message.watsonData.output) {
                    if (message.watsonData.output.context) {
                        if (message.watsonData.output.context.facebook) {
                            if (clientType == 'facebook') {
                                customFacebookMessage = true;
                            }
                    }
                        if (message.watsonData.output.context.action) {
                            actionToBeInvoked = true;
                    }
                    }
                }
        }
            if (actionToBeInvoked == true) {
                bot.reply(message, message.watsonData.output.text.join('\n'));
                invokeAction(message.watsonData.output, bot, message);
            }
             else {
                    if (customFacebookMessage == true) {
                        bot.reply(message, message.watsonData.output.context.facebook);
                    }
                    else {
                        bot.reply(message, message.watsonData.output.text[0]);
                    }
            }
            }
        }
}
