// Submit username/ password to login
var submit= document.getElementById('submit_btn');
submit.onclick= function() {
    
        // create request object
    var request = new XMLHttpRequest();
    
    //capture the response and store it in a variable
    request.onreadystatechange = function(){
        if(request.readyState== XMLHttpRequest.DONE){
            //TAKE SOME ACTION
            if(request.status==200){
                alert('Logged in  successfully');
            } else if(request.status==403){
                alert('Username/ Password is incorrect');
            } else if(request.status==500){
                alert('Something went wrong on the server');
            }
        }
        //ELSE DO NOTHING
    };
    
    // make request
    var username= document.getElementById('username').value;
    var password= document.getElementById('password').value;
    console.log(username);
    console.log(password);
    request.open("POST","http://avi2012bhoyar.imad.hasura-app.io/login",true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username: username, password: password}));
    
};
















