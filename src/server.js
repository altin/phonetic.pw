/*******************************************************************************
Course: COMP3008 (Winter 2018), Project 2
Project: Project 2 - Password Scheme
Name: Phonetic.pw
Group Members: Jason Lai, Altin Rexhepaj, Randy Taylor, Devin Waclawik
*******************************************************************************/
// Server for phonetic.pw password testing framework

//Load modules
var http = require('http');
var fs = require('fs');
var url = require('url');
var mime = require('mime-types');
const ROOT = "./client";

//Create server
var server = http.createServer(handleRequest);
server.listen(3008);
console.log("Server listening on port 3008");

/*
name: handleRequest
input: req(HTTP request), res(HTTP response)
output: none
purpose: handles HTTP requests from the client
*/
function handleRequest(req, res) {
    console.log(req.method + " request for: " + req.url);

    var filename = ROOT + req.url;
    var code = 500;
    var data = "";
    var urlObject = url.parse(req.url, true);
    //Route for request for logging
    if (urlObject.pathname === "/log") {
        if (req.method === 'POST') {
            var stamp = "";
            // build stamp body
            req.on('data', function(chunk) {
                stamp += chunk;
            });
            // once stamp body is finished being built
            req.on('end', function() {
                fs.appendFile("./logs/log.csv", stamp + '\n', function(err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("Log updated!");
                });
            });
        } else if (req.method === 'GET') {
            var userNum = 1;
            //check if the directory exists, if not, create it
            if (!fs.existsSync('./logs')) {
                fs.mkdirSync('./logs');
            } else {
                var contents = fs.readFileSync("./logs/log.csv", 'utf8');
                var lines = contents.trim().split('\n');
                var lastLine = lines.slice(-1)[0];
                userNum = lastLine.split('[')[1].split(']')[0];
                userNum = parseInt(userNum) + 1;
                console.log(userNum);
            }
            data += userNum;
        }
        code = 200;
    } else {
        if (fs.existsSync(filename)) {
            var stats = fs.statSync(filename);
            if (stats.isDirectory()) { // return main page
                filename += "/tester.html";
            }
            console.log("Getting file: " + filename);
            data = fs.readFileSync(filename);
            code = 200;

        } else { // return 404 page for bad request
            console.log("File not found");
            code = 404;
            data = fs.readFileSync(ROOT + "/404.html");
        }
    }

    res.writeHead(code, {
        'content-type': mime.lookup(filename) || 'text/html'
    });
    res.end(data);
}