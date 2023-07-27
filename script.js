const input = document.querySelector("#fileInput")
const output = document.querySelector("output")


let currentImage = "";

let imagesArray = []

input.addEventListener("change", () => {
    const files = input.files
    let images = ""
    for (let i = 0; i < files.length; i++) {
        imagesArray.push(`img_`);
      //   console.log(imagesArray.i)
        images += `<div  onclick="selectImage(event)">
        <img style="display: block;" id="${imagesArray.length-1}" src="${URL.createObjectURL(files[i])}" alt="image">
        <canvas style="display: none;"  id="canvas_${imagesArray.length-1}"></canvas>
      </div>
      `;
   };
   currentImage = `${imagesArray.length-1}`;
   // console.log(currentImage);
   output.innerHTML += images

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
   console.log(event)
  currentImage = event.target;

  // Check if the clicked element is the canvas element
  if (currentImage.tagName === 'CANVAS') {
    // Find the parent div element
    var parentDiv = currentImage.parentNode;

    // Find the img element inside the div
    var imgElement = parentDiv.querySelector('img');

    // Retrieve the 'id' attribute of the image
    var imgId = imgElement.id;

    // Now you can work with the 'imgId' as needed
   //  console.log("Image ID: " + imgId);
   
   currentImage = imgId
   console.log(currentImage);

  } else if (currentImage.tagName === 'IMG') {
    // If the clicked element is already the img element, directly get the 'id' attribute
    var imgId = currentImage.id;

    currentImage = imgId
    // Now you can work with the 'imgId' as needed
   //  console.log("Image ID: " + imgId);
    console.log(currentImage);

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

   canvas.style.display = "block";
   document.getElementById(currentImage).style.display = "none";



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