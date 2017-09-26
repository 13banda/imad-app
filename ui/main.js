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



var submit_btn=document.getElementById('submit_btn');
submit_btn.onclick=function(){
    // make the request to the server and get the name list object
    //render the result to list
    var names=['name','name'];
    var listItems='';
    var list=document.getElementById('nameList');
    for(var i=0;i>names.length;i++){
        listItems+='<li>'+names[i]+'</li>';
    }
    list.innerHTML=listItems;
};


