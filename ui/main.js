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
            if(request.STATUS===200){
                var counter=request.responseText;
                var span=document.getElementById('count');
                span.innerHTML=counter+'';
            }
        }
    };
    // MAke the Request
    request.open('GET','http://wwaheguru9509088985.imad.hasura-app.io/counter',true);
    request.send(null);
};
