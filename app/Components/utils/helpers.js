var axios = require("axios");

//connecting to NY Times API
const authKey = "3f16637e99b44d309b4273dd931aec09";

//helper functions
var helpers = {
	runQuery: function(searchTerm, startYear, endYear){

		var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=" + topic + "&begin_date=" + startYear + "0101&end_date=" + endYear + "0101";
	
		return axios.get(queryURL)
			.then(function(response){
				var newResults = [];
				var fullResults = response.data.response.docs;
				var counter = 0;

				for(var i = 0; i < fullResults.length; i++){
					if(counter > 5){
						return newResults;
					}

					if(fullResults[counter].headline.main && fullResults[counter].pub_date && fullResults[counter].web_url){
						newResults.push( fullResults[counter]);
						counter++;
					}
				}

				return newResults;
			})
	},
	// post saved articles
	postSavedArticles: function(title, date, url){
		axios.post("/api/saved", {title: title, date: date, url: url})
			.then(function(results){
				console.log("Saved to nytimes db");
				return(results);
			})
	}

}

module.exports = helpers