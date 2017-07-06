"use strict";

const Alexa = require("alexa-sdk");
const appId = process.env.SKILL_APP_ID;

const handlers = {
    "HotThisWeek": function() {
        var message = "Here is what is hot this week";
        this.emit(":tell", message);
    },
    "NewSession": function () {
        this.emit(":ask", "Welcome to Explore GitHub, why not ask me what is trending this week?", "You can ask me what is trending this week")
    },
    "Unhandled": function() {
        this.emit(":ask", "Sorry, I didn't understand that, why not ask me what is trending this week?", "You can ask me what is trending this week");
    }
};

exports.handler = (event, context, callback) => {
    let alexa = Alexa.handler(event, context, callback);

    alexa.appId = appId;
    alexa.registerHandlers(handlers);
    alexa.execute();
};