// source code of our web server.

// importing some software packages. these are very common labraries
var express = require('express'); // used to create web server so that we need not to learn to listen on port or  handling http connections. 
var morgan = require('morgan'); //used to help us output logs of server that we know what request comming to server to a server and how we handle those.
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');

var config={
    user: 'avi2012bhoyar',
    database: 'avi2012bhoyar',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

function createTemplate(data){
    var title=data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
    
    var htmlTemplate= `
    <html>
        <head>
            <title>
                ${title}
            </title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class="container">
                <div>
                <a href="/"> Home </a>
                </div>
                
                <hr/>
                
                <h2>
                    ${heading}
                </h2>
                
                <div>
                    ${date.toDateString()}
                </div>
                
                <div>
                    ${content}
                </div>
                
            </div>
            
        </body>
        
    </html>`;
    
    return htmlTemplate;
}


app.get('/articles/:articleName',function(req,res){
    // articleName== article-one
    // articles[articleName]== {} content object for article one
    
    // SELECT * FROM article WHERE title='article-one'
    // SELECT * FROM article WHERE title='article-one' user can hack here as shown below
    // make query like this SELECT * FROM article WHERE title=''; DELETE WHERE a='asdf'
    // use url like this http://avi2012bhoyar.imad.hasura-app.io/articles/'; DELETE FROM "article" where 'a' = 'a
    // to avoid such hacking use safer way to put parameter in our sql query
    pool.query("SELECT * FROM article WHERE title= $1",[req.params.articleName],function(err, result){
       if(err){
           res.status(500).send(err.toString());
       }else{
           if(result.rows.length===0){
               res.status(404).send('article not found');
           }else{
               var articleData= result.rows[0];
               res.send(createTemplate(articleData));
           }
       }
    });
});


function hash(input, salt){
    // how do we create a hash?
    var hashed = crypto.pbkdf2Sync(input , salt, 100000, 512, 'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
    
    // algorith md5
    // "password" -> ;nfkmnbhggdhkkl
    // "password-this-is-a-salt" -> sjdjfgfsdfgfsdvbfgfdsdfgfd
    // "password-this-is-a-salt" -> <hash> -> <hash> -> <hash> -> <hash> * 10k times
}

app.get('/hash/:input',function(req,res){
    var hashedString = hash(req.params.input, 'this is some random string');
    res.send(hashedString);
});


app.post('/create-user',function(req,res){
    // username password
    //JSON
    var username = req.body.username;
    var password = req.body.password;
    
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password, salt);
    pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, dbString], function (err, result){
         if(err){
             res.status(500).send(err.toString());
         } else{
             res.send('User successfully created: '+ username);
         }
    });
    
});

app.post('/login',function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    
    pool.query('SELECT * from "user" WHERE  username=$1', [username], function (err, result){
         if(err){
             res.status(500).send(err.toString());
         } else{
             if(result.rows.length===0){
                 res.send(403).send('username/password is invalid');
             }else{
                 // match the password
                 var dbString = result.rows[0].password;
                 var salt = dbString.split('$')[2];
                 var hashedPassword = hash(password, salt); // creating a hash based on the password submitted and the origional salt
                 if(hashedPassword=== dbString){
                     res.send('credentials correct');
                 }else{
                     res.send(403).send('username/password is invalid');
                 }
             }
         }
    });
    
});

var pool = new Pool(config);
// Access DB
app.get('/test-db', function (req, res) {
  // make a select request 
  // return a response with the results
  pool.query('SELECT * FROM test', function(err,result){
     if(err){
         res.status(500).send(err.toString());
     } else{
         //res.send(JSON.stringify(result));
         res.send(JSON.stringify(result.rows));
     }
  });
});


// handling specific url
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter= 0;
app.get('/counter', function (req, res) {
  counter= counter+1;
  res.send(counter.toString());
});

// another example of JSON
var names= [];
app.get('/submit-name', function (req, res) { 
    // use format of url like /submit-name?name=abc  //
    // get the name from the request
    var name= req.query.name;
    
    names.push(name);
    //JSON: javascript object notation
    res.send(JSON.stringify(names));
});





// handling specific url
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});




// handling specific url
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

// handling specific url
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


/*// one way of json data
var names= [];
app.get('/submit-name/:name', function (req, res) {
    //get the name from the request
    var name= req.params.name;
    
    names.push(name);
    //JSON: javascript object notation
    res.send(JSON.stringify(names));
});
//////////////// another example code if we try it here will give error
*/


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

