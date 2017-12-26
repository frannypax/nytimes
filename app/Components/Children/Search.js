var react = require("react");

var Search = React.createClass({

	initialState: function(){
		return{
			searchTerm: "",
			startYear: "",
			endYear: ""
		}
	},

	//code below responds to user input
	handleChange: function(event){

		var newState = {};
		newState[event.target.id] = event.target.value;
		this.setState(newState);

	},
	//on submit
	handleClick: function(){
		this.props.setTerm(this.state.topic, this.state.startYear, this.state.endYear);
	},

	render: function(){
		render(
				<div className="panel panel-primary">
					<div className="panel-heading">
						<h3 className="panel-title text-center">Search</h2>
					</div>
					<div className="panel-body text-center">
						<form>
							<div className="form-group">
								<h3>Search Term</h3>
								<input type="text" className="form-control text-center" id="searchTerm" onChange= {this.handleChange} required/>
								<br />
								<h3 className=""><strong>Start Year</strong></h3>
								<input type="text" className="form-control text-center" id="startYear" onChange= {this.handleChange} required/>
								<br />
								<h3 className=""><strong>End Year</strong></h3>
								<input type="text" className="form-control text-center" id="endYear" onChange= {this.handleChange} required/>
								<br />
								<button type="button" className="btn btn-primary" onClick={this.handleClick}>Search</button>
							</div>
						</form>
					</div>
				</div>
			)
	}
});

module.exports = Search;