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
                        for(var i=0;i<names.length;i++){
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


