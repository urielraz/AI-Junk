let images = [];
let currentImageIndex = -1;
let angle = 30;
let dst;

function loadImage(event) {
  const fileInput = event.target;
  const files = fileInput.files;

  if (files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = new Image();
        img.src = e.target.result;
        img.onload = function () {
          images.push(img);
          if (images.length === files.length) {
            displayImages();
          }
        };
      };
      reader.readAsDataURL(files[i]);
    }
  }
}

function displayImages() {
  const imageContainer = document.getElementById('imageContainer');
  imageContainer.innerHTML = '';

  images.forEach((img, index) => {
    const div = document.createElement('div');
    div.appendChild(img);
    div.classList.add('image-item');
    if (index === currentImageIndex) {
      div.classList.add('current-image');
    }
    div.addEventListener('click', () => {
      currentImageIndex = index;
      displayImages();
    });
    imageContainer.appendChild(div);
  });
}

function rotateLeft() {
  rotateImage(-angle);
}

function rotateRight() {
  rotateImage(angle);
}

function rotateSelected() {
  rotateImage(angle);
}

function rotateImage(degrees) {
  if (currentImageIndex >= 0 && currentImageIndex < images.length) {
    const src = cv.imread(images[currentImageIndex]);
    if (!dst) dst = new cv.Mat();
    const dsize = new cv.Size(src.cols, src.rows);
    const center = new cv.Point(src.cols / 2, src.rows / 2);
    const M = cv.getRotationMatrix2D(center, degrees, 1);
    cv.warpAffine(src, dst, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());
    cv.imshow('canvasOutput', dst);
    src.delete();
    M.delete();
  }
}

document.getElementById('fileInput').addEventListener('change', loadImage);
document.getElementById('angleInput').addEventListener('change', (e) => {
  angle = parseInt(e.target.value, 10);
});
