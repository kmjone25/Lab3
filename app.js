var fs = require('fs');
var http = require('http');
var url = require('url');
var path = require('path');
var firstName = "Visitor";
var lastName = '';
var role = '{role}';
var ROOT_DIR = "blog/";
const Emitter = require('events');
var emtr = new Emitter();
var qstring = require('querystring');


http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true, false);
    console.log(urlObj);
    var cookie = req.headers["set-cookie"];
    var html = '{name}';
    var postParams = qstring.parse(reqData);

    if (cookie) {
        firstName = cookie.name;
    } else {
        console.log("no cookie found");
    }
  
    //Gets the data from the username password. 
    if (req.method == "POST"){
        var reqData = '';
        req.on('data', function (chunk) {
            reqData += chunk;
        });
        req.on('end', function() {
            var postParams = qstring.parse(reqData);
            //accountSuccess(postParams.username, postParams.role, res);
            //console.log(postParams);
            console.log(postParams.username + "\n" + postParams.password);
            if(postParams.username === postParams.password){
                role = "reviewer";
                firstName = postParams.username;
            }
            else{
                role = "visitor";
                firstname = postParams.username;
            }
        });
    } 
    //If Method is get then it will go to the specified URL.
    else{
        if (urlObj.pathname === '/' || urlObj.pathname === '/index.html') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            html = getWebpage('index');
        } 
        else if (urlObj.pathname === '/blog/auth.html') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            html = getWebpage('auth');
        }
        else if (urlObj.pathname === '/blog/book1.html') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            html = getWebpage('book1');
        }
        else if (urlObj.pathname === '/blog/book2.html') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            html = getWebpage('book2');
        }else if (urlObj.pathname === '/blog/book3.html') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            html = getWebpage('book3');
        }
        else if (urlObj.pathname === '/blog/movie1.html') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            html = getWebpage('movie1');
        }
        //html = html.replace('{welcome}', firstName);
       // html = firstName;
        html = html.replace('{role}', role);
        res.end(html);
    }
}).listen(3000, '127.0.0.1');

function getWebpage(siteName) {
    var webpage = fs.readFileSync(ROOT_DIR + 'header.html', 'utf8');
    webpage += fs.readFileSync(ROOT_DIR + siteName + '.html', 'utf8');
    webpage += fs.readFileSync(ROOT_DIR + 'footer.html', 'utf8');
    return webpage;
}


function printKeys(array)                                    
{                                                              
    for(var i=0; i< array.length;i++){                      
            console.log("This is an element: " + array[i]); 
    }                                                       
}    





/*
var stuff = JSON.parse(fullPath);
fs.readFile(fullPath, options, function(err, data){
	       if(err) {
		      console.log("\nCould not open File this time" + err);
              console.log(err);
	       }
	       else {
            var stuff = JSON.parse(data);
            for(var i=0; i< stuff.dictionary.length;i++){
                checkForNew(JSON.stringify(stuff.dictionary[i]));
         
            } 
	       }  
        });
*/

/*
var headers = {
    'Host': 'www.example.com',
    'Cookie': cookie,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data, 'utf8')
};
*/
