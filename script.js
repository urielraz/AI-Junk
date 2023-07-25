const input = document.querySelector("input")
const output = document.querySelector("output")
// const Right = document.querySelector("#Right")
// const Left = document.querySelector("#Left")
const angle = document.querySelector("#angle")

let imagesArray = []

input.addEventListener("change", () => {
    const files = input.files
    for (let i = 0; i < files.length; i++) {
        imagesArray.push(files[i])
      }
    displayImages()
 })

 function displayImages(){
    let images = ""
    imagesArray.forEach((image, index) => {
      images += `<div id="image_${index}" class="image">
                  <img src="${URL.createObjectURL(image)}" alt="image">
                  <span onclick="selectImage(${index})">&times;</span>
                </div>`;
               console.log(index)
    })
    console.log(images);
    output.innerHTML = images
    
   
 }

function selectImage(index){
    const select = document.querySelector(`#image_${index}`)
    console.log(select)
 }
 

 function turnRight(){
    console.log("da")
    let src = cv.imread('bdika');
    let dst = new cv.Mat();
    let dsize = new cv.Size(src.rows, src.cols);
    let center = new cv.Point(src.cols / 2, src.rows / 2);
    // You can try more different parameters
    let M = cv.getRotationMatrix2D(center, 45, 1);
    cv.warpAffine(src, dst, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());
    cv.imshow('canvasOutput', dst);
    src.delete(); dst.delete(); M.delete();

 }