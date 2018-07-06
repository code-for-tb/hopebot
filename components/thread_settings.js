var debug = require('debug')('botkit:thread_settings');



module.exports = function(controller) {

    debug('Configuring Facebook thread settings...');

    controller.api.messenger_profile.greeting('Hi, I\'m Hope! I\'m a bot working for Metropolitan Ministries');

    controller.api.messenger_profile.get_started('General_Greetings');

    controller.api.messenger_profile.menu([
        {
            "locale": "default",
            "composer_input_disabled": false,
            "call_to_actions": [    
                {
                    "type":"postback",
                    "title":"Hello",
                    "payload":"General_Greetings"
                },
                {
                    "type":"postback",
                    "title":"Help",
                    "payload":"Help_general"
                },
                {
                    type: "web_url",
                    "title": "Donate",
                    "url":"https://secure.metromin.org/site/SPageNavigator/donate.html",
                    "webview_height_ratio":"full",
                }  
            ]
        }]);
}
