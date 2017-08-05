console.log('Loaded!');

// Change the text of the main-text  div
var element= document.getElementById('main-text');

element.innerHTML= 'New Value';

// move the image
var image= document.getElementById('modi');

image.onclick = function() {
   image.style.marginleft="100px";
}; 

