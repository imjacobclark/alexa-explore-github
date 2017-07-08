"use strict";

const REQUEST_USER_AGENT = "alexa-explore-github";

const API_ENDPOINTS = {
  "weeklyTrending": "https://api.github.com/search/repositories?sort=stars&order=desc&q=created:>" + getLastSunday(),
  "monthlyTrending": "https://api.github.com/search/repositories?sort=stars&order=desc&q=created:>" + getFirstDayOfMonth()
}

class GitHub {
  constructor(request) {
    this.request = request;
  }

  getTrendingRepositories(endpointId, period) {
    let uri = API_ENDPOINTS[endpointId];

    return this.request.get({
        uri: uri,
        headers: {
          "User-Agent": REQUEST_USER_AGENT
        }
      }).then(data => {
        console.info("Got response", uri, data);
        
        let response = "Here are the top 5 repositories this " + period + "! \n";
        data = JSON.parse(data);

        for(let i = 0; i < 5; i++){
          response += "Number " + (i + 1) + " - " + data.items[i].name + ", ";
          response += data.items[i].description + ". \n";
        }    
        
        return response;
    });
  }
}

function getLastSunday(){
  let now = new Date();
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let lastSunday = new Date(today.setDate(today.getDate()-today.getDay()));

  return lastSunday.getFullYear() + "-" + ("0" + (lastSunday.getMonth() + 1)).slice(-2) + "-" + ("0" + lastSunday.getDate()).slice(-2);
}

function getFirstDayOfMonth(){
  let now = new Date();
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let lastSunday = new Date(today.setDate(today.getDate()-today.getDay()));

  return lastSunday.getFullYear() + "-" + ("0" + (lastSunday.getMonth() + 1)).slice(-2) + "-" + "01";
}

module.exports = GitHub;