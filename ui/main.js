console.log('Loaded!');
/*// change the main text
var element=document.getElementById("main-text");
element.innerHTML='new values';

var img=document.getElementById('madi');
var marginLeft=0;
function moveleft(){
    marginLeft=marginLeft+1;
    img.style.marginRight=marginLeft+'px';
}
img.onclick=function(){
    var inertval=setInterval(moveleft,50);
    
}
*/

var btn=document.getElementById('counter');
btn.onclick=function(){
// make a request to server
    var request=new XMLHttpRequest();
    request.onreadystatechange=function(){
        if(request.readyState===XMLHttpRequest.DONE){
            //take some action
            if(request.status===200){
                var counter=request.responseText;
                var span=document.getElementById('count');
                span.innerHTML=counter.toString();
            }
        }
    };
    // MAke the Request
    request.open('GET','http://wwaheguru9509088985.imad.hasura-app.io/counter',true);
    request.send(null);
};


var nameInput=document.getElementById('name');
var submit_btn=document.getElementById('submit-btn');
submit_btn.onclick=function(){
    // make the request to the server and get the name list object
        var request=new XMLHttpRequest();
            request.onreadystatechange=function(){
                if(request.readyState===XMLHttpRequest.DONE){
                    //take some action
                    if(request.status===200){
                        var names=request.responseText;
                        names=JSON.parse(names);
                        var list='';
                        for(var i=names.length-1;i>=0;i--){
                            list+='<li>'+names[i]+'</li>';
                        }
                        var ul=document.getElementById('nameList');
                        ul.innerHTML=list;
                    }
                }
            };
            // MAke the Request
            request.open('GET','http://wwaheguru9509088985.imad.hasura-app.io/submit-name?name='+nameInput.value,true);
            request.send(null);
   
};



var loginSubmit_btn=document.getElementById('login-submit-btn');
loginSubmit_btn.onclick= function (){
    // make the request to the server and get the name list object
        var request=new XMLHttpRequest();
            request.onreadystatechange=function(){
                if(request.readyState===XMLHttpRequest.DONE){
                    //take some action
                    if(request.status===200){
                        // babnner set logout banner
                        var loginPanel=document.getElementById('login-panel');
                        loginPanel.innerHTML="<a href='/logout' >logout</a> "+userName;
                     alert(userName+' have sucessfully loged');
                    }
                    else if(request.status===403){
                        alert('username/password is invalid');
                    }
                    else{
                        alert('something went wrong!');
                    }
                }
            };

                        // MAke the Request
            var userName=document.getElementById('username').value;
            var password=document.getElementById('password').value;
            request.open('POST','http://wwaheguru9509088985.imad.hasura-app.io/login',true);
            request.setRequestHeader('Content-Type','application/json');
            request.send(JSON.stringify({username:userName,password:password}));
};

var newUser_btn=document.getElementById('new-user-submit-btn');
newUser_btn.onclick= function (){
    // make the request to the server and get the name list object
        var request=new XMLHttpRequest();
            request.onreadystatechange=function(){
                if(request.readyState===XMLHttpRequest.DONE){
                    //take some action
                    if(request.status===200){
                        // babnner set logout banner
                        
                     alert(userName+' have sucessfully Registred');
                    newUser_btn.value='Registred';
                        
                    }
                    else{
                        alert('something went wrong!');
                        newUser_btn.value='Register';
                        
                    }
                }
            };

                        // MAke the Request
            var userName=document.getElementById('username').value;
            var password=document.getElementById('password').value;
            request.open('POST','http://wwaheguru9509088985.imad.hasura-app.io/create-user',true);
            request.setRequestHeader('Content-Type','application/json');
            request.send(JSON.stringify({username:userName,password:password}));
            newUser_btn.value='Registering';
};


       var request=new XMLHttpRequest();
            request.onreadystatechange=function(){
                if(request.readyState===XMLHttpRequest.DONE){
                    //take some action
                    if(request.status===200){
                        // babnner set logout banner
                        var username=request.responseText;
                        if(username!==null){
                        var loginPanel=document.getElementById('login-panel');
                        loginPanel.innerHTML="<a href='/logout' >logout</a> "+username;
                        }
                    }
                    
                }
            };

            // MAke the Request
            request.open('GET','http://wwaheguru9509088985.imad.hasura-app.io/check-login',true);
            request.send(null);
        

   