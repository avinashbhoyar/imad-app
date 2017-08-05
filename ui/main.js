console.log('Loaded!');

// Change the text of the main-text  div
var element= document.getElementById('main-text');

element.innerHTML= 'New Value';

// move the image
var img= document.getElementById('modi');

img.onclick = function(){
   img.style.marginleft='10000px'; 
}; 

