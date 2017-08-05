console.log('Loaded!');

// Change the text of the main-text  div
var element= document.getElementById('main-text');

element.innerHTML= 'New Value';

// move the image
var img= document.getElementById('modi');

/*img.onclick = function() {
   img.style.marginLeft = "200px";
}; */

var marginLeft=0;
function moveRight(){
    marginLeft= marginLeft+1;
    img.style.marginLeft= marginLeft+ 'px';
}

img.onclick=function(){
    var interval= setInterval(moveRight,50);
}; 
