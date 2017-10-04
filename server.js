var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var app = express();
app.use(morgan('combined'));

var articles={
    'article-one':{
        title: 'article One | About',
        heading:'Article-one',
        date:'spt 19',
        content:`<p>
                            this is content of article one.                this is content of article one.
                            this is content of article one.                this is content of article one.
                            this is content of article one.                this is content of article one.
                        </p>
                        <p>
                            this is content of article one.                this is content of article one.
                            this is content of article one.                this is content of article one.
                            this is content of article one.                this is content of article one.
                        </p>
                        <p>
                            this is content of article one.                this is content of article one.
                            this is content of article one.                this is content of article one.
                            this is content of article one.                this is content of article one.
                        </p>`
        },
    'article-two':{
        title: 'article two | About',
        heading:'Article-two',
        date:'spt 19',
        content:`<p>
                this is content of article two.
              </p>`
        },
    'article-three':{
        title: 'article three | About',
        heading:'Article-three',
        date:'spt 19',
        content:`<p>
                            this is content of article one.
                </p>`
        }
};
function createTemplate(data){
    var title=data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
    
    var htmlTemplate=`
        <!Doctype html>
        <html>
            <head>
                <title>
              ${title}  
                </title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link href="/ui/style.css" type="text/css" rel="stylesheet" />
            </head>
            <body>
                <div class="container">
                    <div>
                        <a href='/'>Home</a>
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
var counter=0;
app.get('/counter',function(req,res){
    counter=counter+1;
    res.send(counter+'');
});

var config ={
    user:'wwaheguru9509088985',
    database:'wwaheguru9509088985',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.evn.DB_PASSWORD
};
var pool = new Pool(config);
app.get('/test-db',function(req,res){
    //make the request to db
    pool.query('SELECT * FROM tag',function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send(JSON.stringify(result));
        }
    });
    //respond with result
    
});

var names=[];
app.get('/submit-name',function(req,res){//url something /submit-name?name=xxxx;
    var name=req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});

app.get('/:articleName',function(req,res){
    //this is the functionality of express framework
    // when we use colums then it is like a parameter 
    var articleName=req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/display.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'display.css'));
});
app.get('/ui/display', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Display.html'));
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
