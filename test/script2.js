let images = [];
let selectedImageIndex = -1;

function onOpenCvReady() {
    document.getElementById('fileInput').disabled = false;
}

function loadImage(input) {
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = function (e) {
            let img = document.createElement('img');
            img.src = e.target.result;
            img.onclick = function () {
                selectedImageIndex = images.indexOf(this);
                drawImages();
            };
            images.push(img);
            drawImages();
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function loadImages() {
    let fileInput = document.getElementById('fileInput');
    for (let i = 0; i < fileInput.files.length; i++) {
        loadImage({ files: [fileInput.files[i]] });
    }
}

function drawImages() {
    let imagesContainer = document.getElementById('imagesContainer');
    imagesContainer.innerHTML = '';
    images.forEach((img) => {
        imagesContainer.appendChild(img);
    });
}

function rotateImage(angle) {
    if (selectedImageIndex !== -1) {
        let src = cv.imread(images[selectedImageIndex]);
        let dst = new cv.Mat();
        let dsize = new cv.Size(src.cols, src.rows);
        let center = new cv.Point(src.cols / 2, src.rows / 2);
        let M = cv.getRotationMatrix2D(center, angle, 1);
        cv.warpAffine(src, dst, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());
        cv.imshow(images[selectedImageIndex], dst);
        src.delete();
        dst.delete();
        M.delete();
    }
}

function rotateImageLeft() {
    let angleInput = document.getElementById('angle');
    let angle = parseFloat(angleInput.value) - 45;
    angleInput.value = angle;
    rotateImage(angle);
}

function rotateImageRight() {
    let angleInput = document.getElementById('angle');
    let angle = parseFloat(angleInput.value) + 45;
    angleInput.value = angle;
    rotateImage(angle);
}
