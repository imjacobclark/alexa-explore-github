"use strict";

const Alexa = require("alexa-sdk");
const request = require("request-promise");

const GITHUB_WEEKLY_TRENDING_URL = "https://api.github.com/search/repositories?sort=stars&order=desc&q=created:>" + getLastSunday();
const GITHUB_MONTHLY_TRENDING_URL = "https://api.github.com/search/repositories?sort=stars&order=desc&q=created:>" + getFirstDayOfMonth();
const REQUEST_USER_AGENT = "alexa-explore-github";

const handlers = {
    "WeeklyTrendingRepositories": function(){ 
        getWeeklyTrendingRepositories(GITHUB_WEEKLY_TRENDING_URL, "week").then(response => this.emit(":tell", response))
    },
    "MonthlyTrendingRepositories": function(){ 
        getWeeklyTrendingRepositories(GITHUB_MONTHLY_TRENDING_URL, "month").then(response => this.emit(":tell", response))
    },
    "LaunchRequest":  function(){ 
        this.emit(":ask", "Welcome to Explore GitHub! You can ask me what is trending this week?", "You can ask me what is trending this week")
    },
    "Unhandled": function(){ 
        this.emit(":ask", "Sorry, I didn't understand that, you can ask me what is trending this week?", "You can ask me what is trending this week")
    },
    "AMAZON.CancelIntent": function(){ 
        this.emit(":tell", "Okay, goodbye!");
    },
    "AMAZON.StopIntent": function(){ 
        this.emit(":tell", "Okay, goodbye!");
    }
};

function getWeeklyTrendingRepositories(uri, period) {
    return request.get({
            uri: uri,
            headers: {
                "User-Agent": REQUEST_USER_AGENT
            }
        }).then(data => {
            let response = "Here are the top 5 repositories this " + period + "! ";
            data = JSON.parse(data);

            for(let i = 0; i < 5; i++){
                response += "Number " + (i + 1) + " - " + data.items[i].name + ", ";
                response += data.items[i].description + ". ";
            }    

            return response;
        });
}

function getFirstDayOfMonth(){
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var lastSunday = new Date(today.setDate(today.getDate()-today.getDay()));

    return lastSunday.getFullYear() + "-" + ("0" + (lastSunday.getMonth() + 1)).slice(-2) + "-" + "01";
}

function getLastSunday(){
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var lastSunday = new Date(today.setDate(today.getDate()-today.getDay()));

    return lastSunday.getFullYear() + "-" + ("0" + (lastSunday.getMonth() + 1)).slice(-2) + "-" + ("0" + lastSunday.getDate()).slice(-2);
}

exports.handler = (event, context, callback) => {
    let alexa = Alexa.handler(event, context, callback);

    alexa.registerHandlers(handlers);
    alexa.execute();
};

