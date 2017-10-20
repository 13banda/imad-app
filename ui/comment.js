var article_title=window.location.pathname.split('/')[2];
function loadComments(){
    // make a request to server
    var request=new XMLHttpRequest();
    var commentPanel=document.getElementById("comment_panel");
    request.onreadystatechange=function(){
        if(request.readyState===XMLHttpRequest.DONE){
            //take some action
            if(request.status===200){
                var comments=request.responseText;
               
                comments=JSON.parse(comments);
                 console.log(comments);
                  console.log(comments[0].username);
                var commentBody="";
                for(let i=0;i<comments.length;i++){
                   commentBody+="<p>"+comments[i].comment+"</p><h5>"+comments[i].username+" - "+Date(comments[i].timestemp).toDateString()+"</h5><hr>";
                }
                commentPanel.innerHTML=""+commentBody;
            }else{
                commentPanel.innerHTML="something went worng!";
            }
        }
    };
    // MAke the Request
    commentPanel.innerHTML="comments are loadings...";
    request.open('GET','http://wwaheguru9509088985.imad.hasura-app.io/comments?article=article_title',true);
    request.send(null);

}

var request_1=new XMLHttpRequest();
var newcommentPanel=document.getElementById("add_comment");
request_1.onreadystatechange=function(){
    if(request_1.readyState===XMLHttpRequest.DONE){
        //take some action
        if(request_1.status===200){
            var commentPanel=request_1.responseText;
            newcommentPanel.innerHTML=""+commentPanel;
            
            var jsElm = document.createElement("script");
            // set the type attribute
            jsElm.type = "application/javascript";
            // make the script element load file
            jsElm.src = '/ui/submitcomment.js';
            // finally insert the element to the body element in order to load the script
            newcommentPanel.appendChild(jsElm);
        }else{
            newcommentPanel.innerHTML="";
        }
    }
};
// MAke the Request
request_1.open('GET','http://wwaheguru9509088985.imad.hasura-app.io/add-new-comment-panel',true);
request_1.send(null);


