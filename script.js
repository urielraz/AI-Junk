const input = document.querySelector("input")
const output = document.querySelector("output")
// const Right = document.querySelector("#Right")
// const Left = document.querySelector("#Left")
// const angle = document.querySelector("#angle")
// const bdika = document.querySelector("#bdika")

let currentImage = "";

let imagesArray = []

input.addEventListener("change", () => {
    const files = input.files
    let images = ""
    for (let i = 0; i < files.length; i++) {
        imagesArray.push(URL.createObjectURL(files[i]));
      //   console.log(imagesArray[i])
        images += `<div  class="image">
        <img onclick="selectImage(event)" id="${imagesArray[i]}" src="${URL.createObjectURL(files[i])}" alt="image">
      </div>`;
   };
   // currentImage = `img_${files.length-1}`;
   currentImage = imagesArray.length-1;
   console.log(currentImage);
   output.innerHTML += images

   
      // displayImages()
      // selectImage(files.length-1)
 })

 function displayImages(){
    
    imagesArray.forEach((image, index) => {
     
               // console.log(index)
    })
   //  console.log(images);
    
   
 }

function selectImage(index){
   //  const select = document.querySelector(`#image_${index}`)
    console.log(index.target)
   }
   
   
   function turnRight(){
    const sh = document.querySelector(`#sh`)
   console.log(imagesArray[0])
    let src = cv.imread(sh);
    console.log("da")
    let dst = new cv.Mat();
    let dsize = new cv.Size(src.rows, src.cols);
    let center = new cv.Point(src.cols / 2, src.rows / 2);
    // You can try more different parameters
    let M = cv.getRotationMatrix2D(center, 45, 1);
    cv.warpAffine(src, dst, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());
    cv.imshow('canvasOutput', dst);
    src.delete(); dst.delete(); M.delete();

 }