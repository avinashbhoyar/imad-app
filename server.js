// source code of our web server.

// importing some software packages. these are very common labraries
var express = require('express'); // used to create web server so that we need not to learn to listen on port or  handling http connections. 
var morgan = require('morgan'); //used to help us output logs of server that we know what request comming to server to a server and how we handle those.
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles={ 
    'article-one': {
        title: 'article one | avinash bhoyar',
        heading: 'article one',
        date: '5 aug 2017',
        content: `<p>
                        this is the content for my web app. this is the content for my web app. this is the content for my web app. this is the content for my web app.this is the content for my web app.this is the content for my web app.this is the content for my web app.this is the content for my web app.
                    </p>
                    <p>
                        this is the content for my web app. this is the content for my web app. this is the content for my web app. this is the content for my web app.this is the content for my web app.this is the content for my web app.this is the content for my web app.this is the content for my web app.
                    </p>
                    <p>
                        this is the content for my web app. this is the content for my web app. this is the content for my web app. this is the content for my web app.this is the content for my web app.this is the content for my web app.this is the content for my web app.this is the content for my web app.
                    </p>`
    },
    'article-two': {
        title: 'article Two | avinash bhoyar',
        heading: 'article Two',
        date: '5 aug 2017',
        content: `<p>
                        this is the content for my web app. 
                    </p>`
    },
    'article-three': {
        title: 'article three | avinash bhoyar',
        heading: 'article three',
        date: '5 aug 2017',
        content: `<p>
                        this is the content for my web app. 
                    </p>`
    }

};

function createTempate(data){
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
                    ${date}
                </div>
                
                <div>
                    ${content}
                </div>
                
            </div>
            
        </body>
        
    </html>`;
    
    return htmlTemplate;
}

// handling specific url
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter= 0;
app.get('/counter', function (req, res) {
  counter= counter+1;
  res.send(counter.toString());
});

app.get('/:articleName',function(req,res){
    // articleName== article-one
    // articles[articleName]== {} content object for article one
    var articleName= req.params.articleName;
    res.send(createTempate(articles[articleName]));
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


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

