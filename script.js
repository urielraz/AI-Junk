const input = document.querySelector("#fileInput")
const output = document.querySelector("output")


let currentImage = "";

let imagesArray = []

function getRandomPosition() {
   // Get the dimensions of the viewport
   const viewportWidth = window.innerWidth;
   const viewportHeight = window.innerHeight;
 
   // Generate random top and left positions within the viewport
   const randomTop = Math.floor(Math.random() * (viewportHeight - 100)); // Subtracting 100 to keep the div within the viewport
   const randomLeft = Math.floor(Math.random() * (viewportWidth - 100)); // Subtracting 100 to keep the div within the viewport
 
   return { top: randomTop, left: randomLeft };
 }
 

input.addEventListener("change", () => {
    const files = input.files
    let images = ""
    
    for (let i = 0; i < files.length; i++) {
       const randomPosition = getRandomPosition();

        imagesArray.push(`img_`);
      //   console.log(imagesArray.i)
        images += `<div style="position: absolute; top: ${randomPosition.top}px; left: ${randomPosition.left}px;"  onclick="selectImage(event)">
        <img style="display: inline-block;" id="${imagesArray.length-1}" src="${URL.createObjectURL(files[i])}" alt="image">
        <canvas style="display: none; "  id="canvas_${imagesArray.length-1}" ></canvas>
      </div>
      `;
   };
   currentImage = `${imagesArray.length-1}`;
   // console.log(currentImage);
   output.innerHTML += images
   console.log(output)

 })

 function displayImages(){
    
    imagesArray.forEach((image, index) => {
     
               // console.log(index)
    })
   //  console.log(images);
    
   
 }
// function selectCanvas(index){
//    currentImage = parseFloat(index.target.id)
//    currentImage += 9
//    currentImage = currentImage.toString()
//    console.log(currentImage)
// }


function selectImage(event){
   //  const select = document.querySelector(`#image_${index}`)
   // currentImage = index.target.id
   // console.log(index.target.id)
   
   // Get the clicked element
   // console.log(event)
  currentImage = event.target;

  // Check if the clicked element is the canvas element
  if (currentImage.tagName === 'CANVAS') {
    // Find the parent div element
    let parentDiv = currentImage.parentNode;

    // Find the img element inside the div
    let imgElement = parentDiv.querySelector('img');

    // Retrieve the 'id' attribute of the image
    let imgId = imgElement.id;

    // Now you can work with the 'imgId' as needed
   //  console.log("Image ID: " + imgId);
   
   currentImage = imgId

  } else if (currentImage.tagName === 'IMG') {
    // If the clicked element is already the img element, directly get the 'id' attribute
    var imgId = currentImage.id;

    currentImage = imgId
    // Now you can work with the 'imgId' as needed
   //  console.log("Image ID: " + imgId);
   
}
console.log(currentImage);
   }

function turnLeft(){
   rotateImage("-")
   console.log(output)
}

function turnRight(){
   rotateImage("+")
}
   
   
function rotateImage(parameter){
   const canvas = document.getElementById(`canvas_${currentImage}`)

   const degrees = parameter + document.querySelector("#angleInput").value
   const angle =  parseFloat(degrees)
   // console.log(typeof(angle))
   // console.log(angle)

   // console.log(imagesArray[0])
   let src = cv.imread(currentImage);
   let dst = new cv.Mat();
   let dsize = new cv.Size(src.rows, src.cols);
   let center = new cv.Point(src.cols / 2, src.rows / 2);
   // You can try more different parameters
   let M = cv.getRotationMatrix2D(center, angle, 1);
   cv.warpAffine(src, dst, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());
   cv.imshow(canvas, dst);
   src.delete(); dst.delete(); M.delete();

   document.getElementById(currentImage).style.display = "none";
   canvas.style.display = "inline-block";



   // const imageElement = document.getElementById(currentImage);
   // const parentDiv = imageElement.parentElement;

   // const parentDiv = currentImage.parentElement.nodeName;
   // console.log(parentDiv);



   // const canvasElement = document.createElement('canvas');
   // canvasElement.id = currentImage.id;
   // canvasElement.width = imageElement.width;
   // canvasElement.height = imageElement.height;
   // canvasElement.style.display = 'block';
   // parentDiv.replaceChild(canvasElement, imageElement);

   // currentImage.file = new Blob([cv.matFromImageData(dst).data], { type: 'image/jpeg' });

 }