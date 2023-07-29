const input = document.querySelector("#fileInput")
const output = document.querySelector("output")

let currentImage = -1;
const imagesArray = []

function getRandomPosition() {
   const viewportWidth = window.innerWidth;
   const viewportHeight = window.innerHeight;
 
   const randomTop = Math.floor(Math.random() * (viewportHeight - 100));
   const randomLeft = Math.floor(Math.random() * (viewportWidth - 100));
 
   return { top: randomTop, left: randomLeft };
}

function addImageToOutput(file, index){

   const randomPosition = getRandomPosition();

   const divElement = document.createElement('div');
   //   divElement.className = 'images';
   divElement.style.position = 'absolute';
   divElement.style.top = randomPosition.top + 'px';
   divElement.style.left = randomPosition.left + 'px';
   // divElement.style.height = '350px';
   divElement.onclick = selectImage;
   
   const imgElement = document.createElement('img');
   imgElement.id = index;
   imgElement.src = URL.createObjectURL(file);
   imgElement.style.height = '250px';
   imgElement.alt = 'image';

   const canvasElement = document.createElement('canvas');
   canvasElement.style.display = 'none';
   canvasElement.style.height = '250px';
   canvasElement.id = 'canvas_' + (index);

   divElement.appendChild(imgElement);
   divElement.appendChild(canvasElement);

   output.appendChild(divElement);
} 
 
input.addEventListener("change", () => {
    const files = input.files
    for (let i = 0; i < files.length; i++) {
      imagesArray.push(`img_`);
      addImageToOutput(files[i], imagesArray.length - 1)
   };
   currentImage = `${imagesArray.length-1}`;
 })

function selectImage(event){
   if (event.target.tagName === 'CANVAS') {
      const parentDiv = event.target.parentNode;
      const imgElement = parentDiv.querySelector('img');
      currentImage = imgElement.id;
      
   } else if (event.target.tagName === 'IMG') {
      currentImage = event.target.id;
   }
}

function rotateImage(parameter){
   const canvas = document.getElementById(`canvas_${currentImage}`)

   const degrees = parameter + document.querySelector("#angleInput").value
   const angle =  parseFloat(degrees)

   let src = cv.imread(currentImage);
   let dst = new cv.Mat();
   let dsize = new cv.Size(src.rows, src.cols);
   let center = new cv.Point(src.cols / 2, src.rows / 2);
   let M = cv.getRotationMatrix2D(center, angle, 1);
   cv.warpAffine(src, dst, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());
   cv.imshow(canvas, dst);
   src.delete(); dst.delete(); M.delete();

   document.getElementById(currentImage).style.display = "none";
   canvas.style.display = "block";
 
 }

 function turnLeft(){
   rotateImage("-")
}

function turnRight(){
   rotateImage("+")
}
   