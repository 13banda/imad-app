
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
                commentBody+="<p>"+comments[i].comment+"</p><h4>"+comments[i].username+" - "+comments[i].timestemp.toDateString()+"</h4><hr>";
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