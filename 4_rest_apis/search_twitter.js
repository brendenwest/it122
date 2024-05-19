var http = require('http'),
	https = require('https'),
	express = require('express');

var credentials = require('../lib/credentials.js');

var app = express();
app.set('port', process.env.PORT || 3000);

// set template engine
var handlebars = require('express-handlebars').create({extname: '.hbs' });
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs' );

app.get('/', function(req,res){
    res.type('text/html');
    res.render('search_tweets');
});

app.get('/api/search/:tag', function(req,res){
	console.log(req.params.tag);
    var tweets = getTopTweets(req.params.tag, function(tweets) {
	    res.send(tweets); 
    });
});

// twitter library
var twitter = require('../lib/twitter')({
	consumerKey: credentials.twitter.consumerKey,
	consumerSecret: credentials.twitter.consumerSecret,
});

// twitter integration
var topTweets = {
	tag: '',
	count: 10,
	lastRefreshed: 0,
	refreshInterval: 15 * 60 * 1000,
	tweets: [],
};

function getTopTweets(tag, cb){
	if(tag == topTweets.tag && Date.now() < topTweets.lastRefreshed + topTweets.refreshInterval) {
		return setImmediate(function() {
            cb(topTweets.tweets);
        });
    }

	twitter.search(tag, topTweets.count, function(result){
		topTweets.tag = tag;
		var formattedTweets = [];
		var embedOpts = { omit_script: 1 };
		var promises = result.statuses.map(function(status){
            return new Promise(function(resolve){
    			twitter.embed(status.id_str, embedOpts, function(embed){
    				formattedTweets.push(embed.html);
    				resolve();
    			});
            });
		});
		Promise.all(promises).then(function(){
			topTweets.lastRefreshed = Date.now();
			cb(topTweets.tweets = formattedTweets);
		});
	});
}

app.listen(app.get('port'), function() {
    console.log('Express started');    
});