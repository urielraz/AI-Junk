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
        images += `
        <img style="display: block;" onclick="selectImage(event)" id="img_${imagesArray.length-1}" src="${URL.createObjectURL(files[i])}" alt="image">
        <canvas style="display: none;" id="canvas_img_${imagesArray.length-1}"></canvas>

      `;
   };
   currentImage = `img_${imagesArray.length-1}`;
   // console.log(currentImage);
   output.innerHTML += images

 })

 function displayImages(){
    
    imagesArray.forEach((image, index) => {
     
               // console.log(index)
    })
   //  console.log(images);
    
   
 }

function selectImage(index){
   //  const select = document.querySelector(`#image_${index}`)
   currentImage = index.target.id
   console.log(index.target.id)
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



   const imageElement = document.getElementById(currentImage);
   const parentDiv = imageElement.parentElement;

   // const parentDiv = currentImage.parentElement.nodeName;
   console.log(parentDiv);



   // const canvasElement = document.createElement('canvas');
   // canvasElement.id = currentImage.id;
   // canvasElement.width = imageElement.width;
   // canvasElement.height = imageElement.height;
   // canvasElement.style.display = 'block';
   // parentDiv.replaceChild(canvasElement, imageElement);

   // currentImage.file = new Blob([cv.matFromImageData(dst).data], { type: 'image/jpeg' });

 }