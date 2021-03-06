var React = require('react');

// Saved component. this will show a log of saved articles.
var Saved = React.createClass({

	initialState: function(){
		return {
			savedArticles: []
		}
	},

	clickToDelete: function(result){
		this.props.deleteArticle(result);

	},

	componentWillReceiveProps: function(nextProps){
		var that = this;
		console.log(nextProps);
		var myResults = nextProps.savedArticles.map(function(search, i){
			var boundClick = that.clickToDelete.bind(that, search);
			return <div className="list-group-item" key={i}><a href={search.url} target="_blank">{search.title}</a><br />{search.date}<br /><button type="button" className="btn btn-primary" onClick={boundClick}>Delete</button></div>
		});

		this.setState({savedArticles: myResults});
	},

	// Here we render the function
	render: function(){

		return(

			<div className="panel panel-success">
				<div className="panel-heading">
					<h3 className="panel-title text-center"><strong>Saved Articles</strong></h3>
				</div>
				<div className="panel-body">
					{this.state.savedArticles}
				</div>
			</div>

		)
	}
});

module.exports = Saved;