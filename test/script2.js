
function rotateImage(parameter){
    const canvas = document.getElementById(`canvas_${currentImage}`);
    const imgElement = document.getElementById(currentImage);
  
    const degrees = parameter + parseFloat(document.querySelector("#angleInput").value);
    const angle = degrees * (Math.PI / 180); // Convert degrees to radians
  
    const ctx = canvas.getContext("2d");
  
    // Save the current canvas state
    ctx.save();
  
    // Clear the canvas and set the canvas size to match the rotated image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    const rotatedWidth = Math.abs(Math.cos(angle)) * imgElement.width + Math.abs(Math.sin(angle)) * imgElement.height;
    const rotatedHeight = Math.abs(Math.sin(angle)) * imgElement.width + Math.abs(Math.cos(angle)) * imgElement.height;
  3
    canvas.width = rotatedWidth;
    canvas.height = rotatedHeight;
  
    // Translate the canvas context to the center point
    ctx.translate(rotatedWidth / 2, rotatedHeight / 2);
  
    // Rotate the canvas context
    ctx.rotate(angle);
  
    // Draw the rotated image on the canvas
    ctx.drawImage(imgElement, -imgElement.width / 2, -imgElement.height / 2, imgElement.width, imgElement.height);
  
    // Restore the canvas state
    ctx.restore();
 
    document.getElementById(currentImage).style.display = "none";
    canvas.style.display = "block";
  
  }