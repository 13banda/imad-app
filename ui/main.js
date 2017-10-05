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

function login(){
    // make the request to the server and get the name list object
        var request=new XMLHttpRequest();
            request.onreadystatechange=function(){
                if(request.readyState===XMLHttpRequest.DONE){
                    //take some action
                    if(request.status===200){
                        // babnner set logout banner
                        var loginPanel=document.getElementById('login-panel');
                        loginPanel.innerHTML="<input id='logout-submit-btn' type='submit' value='logout'>";
                       var logout_btn=document.getElementById('logout-submit-btn');
                        logout_btn.onclick=function(){logout();};
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
}
function logout(){
    // make the request to the server and get the name list object
        var request=new XMLHttpRequest();
            request.onreadystatechange=function(){
                if(request.readyState===XMLHttpRequest.DONE){
                    //take some action
                    if(request.status===200){
                        var loginPanel=document.getElementById('login-panel');
                        loginPanel.innerHTML=`<p>Login to get awsome features</p>
                                            <input id='username' type='text' placeholder='User Name'>
                                            <br>
                                            <input id='password' type='password' placeholder='Enter your password'>
                                            <br>
                                            <input id='login-submit-btn' type='submit' value='login'>`;
                         loginSubmit_btn=document.getElementById('login-submit-btn');
                         loginSubmit_btn.onclick=function(){login();};
                        }
                        
                    else{
                        alert('something went wrong!');
                    }
                }
            };
            // MAke the Request
            request.open('GET','http://wwaheguru9509088985.imad.hasura-app.io/logout',true);
            request.send(null);
   
}
var loginSubmit_btn=document.getElementById('login-submit-btn');
loginSubmit_btn.onclick= () =>{
    login();
  };


   