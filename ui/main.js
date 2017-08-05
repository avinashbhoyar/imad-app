// counter code
var button = document.getElementById('counter');

button.onclick = function() {
    
    // create request object
    var request = new XMLHttpRequest();
    
    //capture the response and store it in a variable
    request.onreadystatechange = function(){
        if(request.readyState== XMLHttpRequest.DONE){
            //TAKE SOME ACTION
            if(request.status==200){
                var counter=request.responseText;
                var span= document.getElementById('count');
                span.innerHTML= counter.toString();
            }
        }
        //ELSE DO NOTHING
    };
    
    // make request
    request.open('GET','http://avi2012bhoyar.imad.hasura-app.io/counter',true);
    request.send(null);
};