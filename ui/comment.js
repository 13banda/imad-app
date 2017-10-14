
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
               commentBody+="<p>"+comments[i].comment+"</p><h5>"+comments[i].username+" - "+comments[i].timestemp+"</h5><hr>";
            }
            commentPanel.innerHTML=""+commentBody;
        }else{
            commentPanel.innerHTML="something went worng!";
        }
    }
};
// MAke the Request
commentPanel.innerHTML="comments are loadings...";
request.open('GET','http://wwaheguru9509088985.imad.hasura-app.io/comments?article_id=1',true);
request.send(null);

var request_1=new XMLHttpRequest();
var newcommentPanel=document.getElementById("add_comment");
request_1.onreadystatechange=function(){
    if(request_1.readyState===XMLHttpRequest.DONE){
        //take some action
        if(request_1.status===200){
            var commentPanel=request_1.responseText;
            newcommentPanel.innerHTML=""+commentPanel;
            // MAke the Request
                request_2.open('GET','http://wwaheguru9509088985.imad.hasura-app.io/ui/submitcommment.js',true);
                request_2.send(null);
        }else{
            newcommentPanel.innerHTML="";
        }
    }
};
// MAke the Request
request_1.open('GET','http://wwaheguru9509088985.imad.hasura-app.io/add-new-comment-panel',true);
request_1.send(null);

// make the request for submit request
var request_2=new XMLHttpRequest();
request_2.onreadystatechange=function(){
    if(request_2.readyState===XMLHttpRequest.DONE){
        //take some action
        if(request_2.status===200){
         
        }
    }
};


