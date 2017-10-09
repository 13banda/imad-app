var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser= require('body-parser');
var session= require('express-session');
var config ={
    user:'wwaheguru9509088985',
    database:'wwaheguru9509088985',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: 'thisisthesecretrandomvalues',
    cookie: {maxAge:1000 * 60 * 60 * 24 * 30}
}));
var pool = new Pool(config);

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
                    ${date.toDateString()}
                    </div>
                    <div>
                        ${content}
                    </div>
                    <div>
                      <hr>
                        <h2>Comments</h2>
                       <hr>
                       <div id='comment_panel'>
                        
                       </div>
                    </div>
                </div>
                <script type="text/javascript" src="/ui/comment.js">
            </body>
        </html>`;
    return htmlTemplate;
}
var counter=0;
app.get('/counter',function(req,res){
    counter=counter+1;
    res.send(counter+'');
});

function hash(input,salt){
    //let do make hash
   //pbkd password based key derviation
    var hashed = crypto.pbkdf2Sync(input, salt, 100000, 512, 'sha512');
    return ['pbkdf2',10000,salt,hashed.toString('hex')].join('$');
}

app.get('/hash/:value',function(req,res){
   
   var hashString =hash(req.params.value,"this-is-some-rendom-string");
   res.send(hashString);    
});

app.post('/create-user',function(req,res){
    //username passowrd
    //JSON
    var username=req.body.username;
    var password=req.body.password;
    var salt=crypto.randomBytes(128).toString('hex');
    var dbString=hash(password,salt);
    pool.query('INSERT INTO "users" (username,password) VALUES ($1,$2)',[username,dbString],function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send('user is sucessfully created :'+username);
        }
    });
    
    
});

app.post('/login',function(req,res){
   var username=req.body.username;
    var password=req.body.password;
    pool.query('SELECT * FROM "users" WHERE username=$1',[username],function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            if(result.rows.length===0){
                res.status(403).send('user not found');
            }
            else{
                // match the password
                var dbString=result.rows[0].password;
                var salt=dbString.split('$')[2];
                var hashedPassword=hash(password,salt);
                if(hashedPassword===dbString){
                    
                    // set the session
                    // we asume that request have session and its auth object is now asign
                    req.session.auth={userId: result.rows[0].username};
                    // set the session id cookie
                    // internally on the server side.it maps the session id to an object
                    // {auth:{userId}}
                    
                    res.send('crenditial are correct :'+username);    
                } else{
                    res.status(403).send('password is incorrect');
                }
            }
                
        }
    });
     
});

app.get('/check-login',function(req,res){
    if(req.session && req.session.auth && req.session.auth.userId){
        res.send(JSON.stringify([req.session.auth.userId.toString()]));
    }else{
        res.send(null);
    }
});
app.get('/logout',function(req,res){
    delete req.session.auth;
        res.send("you are logout<br><a href='/'>home</a>");
});

app.get('/comments',function(req,res){
    //make the request to db
    pool.query(`SELECT "users".username,"comments".timestemp,"comments".comment 
                FROM "comments","users" 
                WHERE "comments".article_id=$1 AND "comments".user_id="users".id`,[req.query.article_id],function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send(JSON.stringify(result.rows));
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

app.get('/articles/:articleName',function(req,res){
    //this is the functionality of express framework
    // when we use colums then it is like a parameter 
    pool.query("SELECT * FROM articles WHERE title= $1",[req.params.articleName],function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            
            if(result.rows.length===0){
                res.status(404).send("Articles not found");
            }
            else{
                var articleData=result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
    });
    
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
