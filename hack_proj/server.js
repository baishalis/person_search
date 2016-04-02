//var scraper = require('google-search-scraper');
var https = require('https');
var request = require('request');
//var sync = require('synchronize');

/*var options = {
    query: 'NODE JS',
    limit: 5
};

 var map = {};





var index = 0;
scraper.search(options, function(err, url) {
    // This is called for each result

    if(err) throw err;
    console.log(index + " "+ url);
    index++;
    request(url, function(error, response, body) {
        console.log('requested');
        console.log(body);
        map[url] = body;
    });
});

console.log("hello");
*/
var prompt = require('prompt');
var google = require('google')
var map = {};
var done = 0;
var results = {};

var set1 = [];
var set2 = [];
var set3 = [];

google.resultsPerPage = 10


var prior = {
    'name': 3,
    'email': 1,
    'phone': 1,
    'dob': 2,
    'college': 3

}

prompt.start();

var properties = [
    {
        name: 'name',
        validator: /^[a-zA-Z\s\-]+$/,
        warning: 'Username must be only letters, spaces, or dashes'
    },
    {
        name: 'email',
        hidden: true
    },
    {
        name: 'phone',
        type: 'number'
    },
    {
        name: 'college',
        type: 'string'
    },
    {
        name: 'dob'
    }

];

prompt.get(properties, function (err, result) {
    if (err) { return onErr(err); }
    console.log('Command-line input received:');
    console.log('  Username: ' + result.name);
    console.log('  Email: ' + result.email);
    console.log('  Phone: ' + result.phone);
    console.log('  College Name: ' + result.college);
    console.log('  dob: ' + result.dob);

    var query = "";

    for(var x in result) {
        console.log(prior[x] + "  "+ result[x]);
        query += (" " + result[x]);
        insertWithPrior(prior[x], result[x]);
    }
    console.log(query);


    google(query.toString(), function (err, next, links){
        if (err) console.error(err)

        for (var i = 0; i < links.length; ++i) {
            console.log(links[i].title + ' - ' + links[i].link) // link.href is an alias for link.link
            //console.log(links[i].description + "\n")

            grabSourceCode(links[i].link, links.length);
        }
    });


    // insertWithPrior(result.name, result.priority);
});

function onErr(err) {
    console.log(err);
    return 1;
}




function grabSourceCode(url, lim) {
    request(url, function (error, response,  body) {
        console.log('requested');
        if(error) console.log(error);

        console.log("checking" + url);

        map[url] = body;
        done++;
        if (done == lim) {
            calculateScore();
        }
    });
}

var calculateScore = function() {

    console.log('reached here');
    for(var x in map) {
        //console.log("links" + x );
        var one = checkSet1(map[x]);
        var two = checkSet2(map[x]);
        var three = checkSet3(map[x]);

        if(one > 0 || (two > 0 && three > 0)) {
            results[x] = 'very sure';
        }
        else if(three > 1 ) {
            results[x] = 'sure';
        }
        else if(three == 1) {
            results[x] = 'may be';
        }
        else {
            results[x] = 'No';
        }

    }
    printResult();
}

function checkSet1(content) {
    var count = 0;
    set1.forEach(function(attribute){
       // console.log("set3 "+attribute);
        if (content.toString().toLowerCase().indexOf(attribute.toString().toLowerCase()) > -1) {
            count++;
        }
    });
    return count;
}

function checkSet2(content) {
    var count = 0;
    set2.forEach(function(attribute){
       // console.log("set3 "+attribute);
        if (content.toString().toLowerCase().indexOf(attribute.toString().toLowerCase()) > -1) {
            count++;
        }
    });
    return count;
}

function checkSet3(content) {
    var count = 0;
    set3.forEach(function(attribute){
       // console.log("set3 "+attribute);
        if (content.toString().toLowerCase().indexOf(attribute.toString().toLowerCase()) > -1) {
            count++;
        }
    });


    return count;
}


function insertWithPrior(prior, name) {
    if(prior == 1)
        set1.push(name);
    else if(prior == 2)
        set2.push(name);
    else if(prior == 3)
        set3.push(name);
}


function printResult() {

    for(var x in results) {
        console.log(x + " " + results[x]);
    }
}
