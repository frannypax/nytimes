var React = react("react");
var axios = require("axios");

var Search = require("./Children/Search");
var Results = require("./Children/Results");
var Saved = require("./Children/Saved");

// pulling in helper function
var helpers = require("./utils/helpers");

//Main component
var Main = React.createClass({
	initialState: function(){
		return{
			searchTerm: "",
			startYear: "",
			endYear: "",
			results: [],
			savedArticles: []
		}
	},

	updateParent: function( searchTerm, startYear, endYear){
		this.setState({
			searchterm: searchTerm,
			startYear: startYear,
			endYear: endYear
		})
	},

	saveArticle: function(title, date, url){
		helpers.postArticle(title, date, url);
		this.getArticle();
	},

	getArticle: function(){
		axios.get("/api/saved")
			.then(function(response){
				this.setState({
					savedArticles: response.data
				});
			}.bind(this));
	},

	deleteArticle: function(article){
		axios.delete("/api/saved/" + article._id)
			.then(function(response){
				this.setState({
					savedArticles: response.data
				});
				return response;
			}.bind(this));

		this.getArticle();
	},

	//check if component updated
	componentUpdated: function( propsBefore, stateBefore){
		if(stateBefore.searchTerm != this.state.searchTerm){
			console.log("updated !");

			helpers.runQuery(this.state.searchTerm, this.state.startYear, this.state.endYear)
				.then(function(data){
					if(data != this.state.results){
						this.setState({
							results: data
						})
					}
				}.bind(this))
		}
	},
	componentMounted: function(){
		axios.get("/api/saved")
		.then(function(response){
			this.setState({
				savedArticles: response.data
			});
		}.bind(this));
	},

	render: function(){
		return(

			<div className= "container">
				<div classname="row">
					<div className="jumbotron">
						<h2 className="text-center">New York Times Article Search</h2>
					</div>
				</div>
				<div classname="row">
					<Search setTerm={this.setTerm}/>
				</div>

				<div className="row">
					<Results results={this.state.results} saveArticle={this.saveArticle}/>
				</div>
				<div className="row">
				
					<Saved savedArticles={this.state.savedArticles} deleteArticle={this.deleteArticle} />

				</div>
			</div>)
	}
});

module.exports = Main;