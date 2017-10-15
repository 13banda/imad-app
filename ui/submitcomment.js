
var Submit_btn=document.getElementById('submit_comment_btn');
var commentText=document.getElementById('comment_Area');
Submit_btn.onclick= function (){
    // make the request to the server and get the name list object
        var request=new XMLHttpRequest();
            request.onreadystatechange=function(){
                if(request.readyState===XMLHttpRequest.DONE){
                    //take some action
                    if(request.status===200){
                              // babnner set logout banner
                                var comments=request.responseText;
                                comments=JSON.parse(comments);
                                var commentBody="";
                                for(let i=0;i<comments.length;i++){
                                   commentBody+="<p>"+comments[i].comment+"</p><h5>"+comments[i].username+" - "+comments[i].timestemp+"</h5><hr>";
                                }
                                var commentPanel=document.getElementById("comment_panel");
                                commentPanel.innerHTML=""+commentBody;
                                //set the text area to normal
                                commentText.value='';
                    }
                    else{
                        alert('something went wrong!');
                    }
                }
};

// Make the Request
// get the article name from /articles/article-one
var path=window.location.pathname.split('/');
var articleName=path[2];
request.open('GET','http://wwaheguru9509088985.imad.hasura-app.io/submit-comment?article_id='+articleName+'&comment='+commentText.value,true);
request.send(null);
};