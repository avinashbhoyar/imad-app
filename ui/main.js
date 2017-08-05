// counter code
var button = document.getElementById('counter');
var counter=0;
button.onclick = function() {
    
    // make a request to the counter endpoint
    var request = new XMLHttpRequest();
    
    //capture the response and store it in a variable
    request.onreadystatechange = function(){
        if(request.readyState== XMLHttpRequest.DONE){
            //TAKE SOME ACTION
            
        }
        //ELSE DO NOTHING
    }
    //Render the variable in the correct span
    counter = counter+1;
    var span= document.getElementById('count');
    span.innerHTML= counter.toString();
};