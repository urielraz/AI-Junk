const input = document.querySelector("#fileInput")
const output = document.querySelector("output")

let currentImage = "";

const imagesArray = []

function getRandomPosition() {
   const viewportWidth = window.innerWidth;
   const viewportHeight = window.innerHeight;
 
   const randomTop = Math.floor(Math.random() * (viewportHeight - 100));
   const randomLeft = Math.floor(Math.random() * (viewportWidth - 100));
 
   return { top: randomTop, left: randomLeft };
 }
 

input.addEventListener("change", () => {
    const files = input.files
    let images = ""
    
    for (let i = 0; i < files.length; i++) {
       const randomPosition = getRandomPosition();

        imagesArray.push(`img_`);

        images += `<div class="images" style="position: absolute; top: ${randomPosition.top}px; left: ${randomPosition.left}px;"  onclick="selectImage(event)">
        <img style="display: block;" id="${imagesArray.length-1}" src="${URL.createObjectURL(files[i])}" alt="image">
        <canvas style="display: none;"   id="canvas_${imagesArray.length-1}" ></canvas>
      </div>
      `;
   };
   currentImage = `${imagesArray.length-1}`;
   output.innerHTML += images
   console.log(output)

 })

function selectImage(event){
 
   if (event.target.tagName === 'CANVAS') {

      let parentDiv = event.target.parentNode;

      let imgElement = parentDiv.querySelector('img');

      currentImage = imgElement.id;
      
   } else if (event.target.tagName === 'IMG') {
      currentImage = event.target.id;
   }
}

function turnLeft(){
   rotateImage("-")
}

function turnRight(){
   rotateImage("+")
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