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
                var commentBody="";
                for(let i=0;i<comments.length;i++){
                    var date=new Date(comments[i].timestemp);
                    var time=date.toLocaleTimeString();
                   commentBody+=comments[i].comment+"<div style='textSize='10px'>"+comments[i].username+" at "+time+' on '+date.toLocaleDateString()+"</div><hr>";
                }
                commentPanel.innerHTML=""+commentBody;
            }else{
                commentPanel.innerHTML="something went worng!";
            }
        }
    };
    // MAke the Request
    commentPanel.innerHTML="comments are loadings...";
    request.open('GET','http://wwaheguru9509088985.imad.hasura-app.io/comments?article='+article_title,true);
    request.send(null);
}

function loadNewCommentArea(){
    var request=new XMLHttpRequest();
    var newcommentPanel=document.getElementById("add_comment");
    request.onreadystatechange=function(){
        if(request.readyState===XMLHttpRequest.DONE){
            //take some action
            if(request.status===200){
                if(request.responseText!=='not login'){
                var username=request.responseText;
                newcommentPanel.innerHTML=`submit a comment 
                                         <br><textarea id="comment_Area" placeholder="add a comment here..." ></textarea>
                                         <br><input id="submit_comment_btn" type="submit" value="submit">`;
                           
                            var Submit_btn=document.getElementById('submit_comment_btn');
                            var commentText=document.getElementById('comment_Area');
                            Submit_btn.onclick= function (){
                                // make the request to the server and get the name list object
                                    var request=new XMLHttpRequest();
                                        request.onreadystatechange=function(){
                                            if(request.readyState===XMLHttpRequest.DONE){
                                                //take some action
                                                if(request.status===200){
                                                 commentText.value='';
                                                 loadComments();
                                                }
                                                else{
                                                    alert('something went wrong!');
                                                }
                                            }
                            };
                            request.open('GET','http://wwaheguru9509088985.imad.hasura-app.io/submit-comment?article='+article_title+'&comment='+commentText.value,true);
                            request.send(null);
                            };
               }else{newcommentPanel.innerHTML="";}
            }else{
                newcommentPanel.innerHTML="";
            }
        }
    };
    // Make the Request
    request.open('GET','http://wwaheguru9509088985.imad.hasura-app.io/check-login',true);
    request.send(null);
}

loadNewCommentArea();
loadComments();


// extra practice
let k=() =>{
var jsElm = document.createElement("script");
            // set the type attribute
            jsElm.type = "application/javascript";
            // make the script element load file
            jsElm.src = '/ui/submitcomment.js';
            // finally insert the element to the body element in order to load the script
            newcommentPanel.appendChild(jsElm);
    };

            