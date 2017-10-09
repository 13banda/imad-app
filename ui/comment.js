
// make a request to server
var request=new XMLHttpRequest();
var commentPanel=document.getElementById("comment_panel");
request.onreadystatechange=function(){
    if(request.readyState===XMLHttpRequest.DONE){
        //take some action
        if(request.status===200){
            var comments=request.responseText;
            comments=JSON.parse(comments);
            var commentBody="";
            for(let i=0;i<comments.length;i++){
                commentBody+="<h4></h4>"+comments.username+"<h5> at "+comments.timestemp+" </h5>"+comments.comment+"<hr>";
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