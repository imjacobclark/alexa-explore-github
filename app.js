"use strict";

const Alexa = require("alexa-sdk");
const request = require("request-promise");
const GitHub = require('./lib/GitHub.js');
const github = new GitHub(request);

const handlers = {
    "AMAZON.HelpIntent": function(){ 
        this.emit(":ask", "Hello, why not try saying 'what is trending this week?' or 'what is trending this month?'", "Why not try saying 'what is trending this week?' or 'what is trending this month?'")
    },
    "AMAZON.CancelIntent": function(){ 
        this.emit(":tell", "Okay, goodbye!");
    },
    "AMAZON.StopIntent": function(){ 
        this.emit(":tell", "Okay, goodbye!");
    },
    "WeeklyTrendingRepositories": function(){ 
        github.getTrendingRepositories("weeklyTrending", "week").then(response => this.emit(":tellWithCard", response, "GitHub trends this week", response))
    },
    "MonthlyTrendingRepositories": function(){ 
        github.getTrendingRepositories("monthlyTrending", "month").then(response => this.emit(":tellWithCard", response, "GitHub trends this month", response))
    },
    "LaunchRequest":  function(){ 
        this.emit(":ask", "Welcome to Explore GitHub! You can ask me what is trending this week or month?", "You can ask me what is trending this week or month")
    },
    "Unhandled": function(){ 
        this.emit(":ask", "Sorry, I didn't understand that, you can ask me what is trending this week or month?", "You can ask me what is trending this week or month")
    }
};

exports.handler = (event, context, callback) => {
    let alexa = Alexa.handler(event, context, callback);

    alexa.registerHandlers(handlers);
    alexa.execute();
};

