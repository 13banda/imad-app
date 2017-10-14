
var Submit_btn=document.getElementById('submit_comment_btn');
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
                                 console.log(comments);
                                  console.log(comments[0].username);
                                var commentBody="";
                                for(let i=0;i<comments.length;i++){
                                   commentBody+="<p>"+comments[i].comment+"</p><h5>"+comments[i].username+" - "+comments[i].timestemp+"</h5><hr>";
                                }
                                var commentPanel=document.getElementById("comment_panel");
                                commentPanel.innerHTML=""+commentBody;
                    }
                    else{
                        alert('something went wrong!');
                    }
                }
            };

                        // MAke the Request
            var commentText=document.getElementById('comment_area').value;
            
            request.open('GET','http://wwaheguru9509088985.imad.hasura-app.io/submit-comment?article_id=1&comment='+commentText,true);
          request.send(null);
};