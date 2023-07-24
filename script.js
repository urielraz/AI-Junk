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
               
    })
    console.log(images);
    output.innerHTML = images
    
   
 }

function selectImage(index){
    const select = document.querySelector(`#image_${index}`)
    console.log(select)
 }