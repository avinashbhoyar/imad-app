// counter code
var button = document.grtElementById('counter');
button.onclick = function() {
    
    // make a request to the counter endpoint
    
    //capture the response and store it in a variable
    
    //Render the variable in the correct span
    counter = counter+1;
    var span= document.getElementById('count');
    span.innerHTML= counter.toString();
};