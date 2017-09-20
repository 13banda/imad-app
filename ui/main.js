console.log('Loaded!');
// change the main text
var element=document.getElementById("main-text");
element.innerHTML='new values';

var img=document.getElementById('madi');
var marginLeft=0;
function moverleft(){
    marginLeft=marginLeft+1;
    img.style.marginRight=marginLeft+'px';
}
img.onclick=function(){
    var inertval=setInterval(moveleft,50);
    
}


