// node modules
var bodyParser = require('body-parser');
var express    = require('express');
var app        = express();

var http = require("http");
var request = require("request");

//var mongoose   = require('mongoose');
//var Request    = require('./app/models/request');

//mongoose.connect('mongodb://localhost:27017/DipperAPI'); // connect to our database
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//var globalTunnel = require('global-tunnel');
//
//globalTunnel.initialize({
//    host: '172.31.1.3',
//    port: 8080
//});


var google = require('google')

var port = process.env.PORT || 3000;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();		// get an instance of the express Router

var prompt = require('prompt');
var google = require('google');
var map = {};
var done = 0;
var results = {};

var set1 = [];
var set2 = [];
var set3 = [];

google.resultsPerPage = 10;

//google.requestOptions = {
//    proxy: 'http://172.31.1.3:8080',
//    headers: {
//        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
//        'Accept-Encoding': 'gzip, deflate',
//        'Accept-Language': 'en;q=0.5',
//        'Cache-Control': 'max-age=0',
//        'Connection': 'keep-alive',
//        'DNT': 1
//    }
//}

var prior = {
    'name': 2,
    'email': 1,
    'phone': 1,
    'dob': 2,
    'college': 2
}



function onErr(err) {
    console.log(err);
    return 1;
}


//insertWithPrior(1, '8737862286');
//insertWithPrior(1, 'abshk246@gmail.com');
//insertWithPrior(2, 'Abhishek');
//insertWithPrior(3, 'Jaiswal');
//insertWithPrior(2, 'iiit allahabad');



function grabSourceCode(url, lim) {


    //console.log("checking url " + url);
    //
    //var options = {
    //    host: "172.31.1.3",
    //    port: 8080,
    //    path: url
    //};
    //http.get(options, function(res) {
    //    console.log(res);
    //    res.pipe(process.stdout);
    //});
    //
    //done++;
    //
    //if (done == lim) {
    //    //calculateScore();
    //}


    //request({url:  url + '',
    //    proxy:'http://172.31.1.3:8080'}, function (error, response,  body) {
    request(url, function (error, response,  body) {

        //console.log('requested');
        if(error) console.log(error);

        console.log("checking" + url);

        map[url] = body;
        //console.log(body);
        done++;
        if (done == lim) {
            calculateScore();
        }
    });
}

var calculateScore = function() {

    console.log('reached here');

    var one = 0;
    var two = 0;
    var three = 0;

    for(var x in map) {
        //console.log("links" + x );
        var one = 0;
        var two = 0;
        var three = 0;

        for(var i = 0; i < set1.length; i++) {
            one += checkSet1(map[x], set1[i]);
            //console.log(one + ' ' + set1[i])
        }

        for(var i = 0; i < set2.length; i++)
            two += checkSet1(map[x], set2[i]);

        for(var i = 0; i < set3.length; i++)
            three += checkSet1(map[x], set3[i]);


        console.log(one + ' ' + two +  ' ' + three);

        if(one > 0 || (two > 0 && three > 0)) {
            results[x] = 'very sure';
        }
        else if(two > 3) {
            results[x] = 'sure';
        }
        else if(two > 0) {
            results[x] = 'may be';
        }
        else if(three > 0) {
            results[x] = "can't say";
        }
        else {
            results[x] = 'No';
        }


    }
    printResult();
}

function checkSet1(content, attribute) {


    if(content === null || content === undefined || attribute === null || attribute === undefined)
        return 0;
    if (content.toString().toLowerCase().indexOf(attribute.toString().toLowerCase()) > -1) {
        return 1;
    }

    return 0;

}



function insertWithPrior(prior, name) {
    if(prior == 1) set1.push(name);
    if(prior == 2) set2.push(name);
    if(prior == 3) set3.push(name);
}


function printResult() {

    for(var x in results) {
        console.log(x + " " + results[x]);
    }
}


google.resultsPerPage = 10
var nextCounter = 0

//google('abhishek jaiswal IIIT allahabad', function (err, res){
//    if (err) console.error(err)
//
//    for (var i = 0; i < res.links.length; ++i) {
//        var link = res.links[i];
//        //console.log(link.title + ' - ' + link.href)
//        //console.log(link.description + "\n")
//
//        grabSourceCode(link.href, res.links.length);
//    }
//
//    if (nextCounter < 0) {
//        nextCounter += 1
//        if (res.next) res.next()
//    }
//
//})




app.post('/login',function(req, res){

    console.log(req.body);

    //var len = req.body.length;
    var fname = req.body.fname;
    var phone = req.body.phone;
    var email = req.body.email;
    var college = req.body.college;
    var lname = req.body.lname;

    console.log('Command-line input received:');
    console.log('  Username: ' + fname);
    console.log('  Email: ' + lname);
    console.log('  Phone: ' + phone);
    console.log('  College Name: ' + college);
    console.log('  email: ' + email);


    //var query2=request.body.var2;
    //res.send(query1);

    var query;

    insertWithPrior(1, phone);
    insertWithPrior(1, email);
    insertWithPrior(2, fname);
    insertWithPrior(3, lname);
    insertWithPrior(2, college);

    query = fname + " " + lname + " " + college;

    google(query, function (err, res){
        if (err) console.error(err)

        for (var i = 0; i < res.links.length; ++i) {
            var link = res.links[i];
            //console.log(link.title + ' - ' + link.href)
            //console.log(link.description + "\n")

            grabSourceCode(link.href, res.links.length);
        }

        if (nextCounter < 0) {
            nextCounter += 1
            if (res.next) res.next()
        }

    })





    console.log(query);


});




//app.use('/api', router);	// all of our routes will be prefixed with /api



// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server started.');