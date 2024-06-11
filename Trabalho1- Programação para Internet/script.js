// cor de fundo aleatória
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Movimento Constante
let container = document.querySelector('.volume-control-container');
let control = document.querySelector('.volume-control');

let xDirection = 1;
let yDirection = 1;
let speed = 2;

function moveControl() {
    let rect = control.getBoundingClientRect();
    if (rect.right >= window.innerWidth || rect.left <= 0) {
        xDirection *= -1;
    }
    if (rect.bottom >= window.innerHeight || rect.top <= 0) {
        yDirection *= -1;
    }
    control.style.left = (rect.left + xDirection * speed) + 'px';
    control.style.top = (rect.top + yDirection * speed) + 'px';
    requestAnimationFrame(moveControl);
}
moveControl();

// Slider em Zigue-zague
let zIndexDirection = 1;
let zIndexStep = 10;
document.getElementById('volumeSlider').addEventListener('input', function() {
    this.style.transform = `translateY(${zIndexDirection * zIndexStep}px)`;
    zIndexDirection *= -1;
});

//  Slider invisível
document.getElementById('volumeSlider').addEventListener('mouseenter', function() {
    this.style.opacity = 1;
});
document.getElementById('volumeSlider').addEventListener('mouseleave', function() {
    this.style.opacity = 0;
});

// Alternar entre vertical,diagonal e horizontal
let rotationAngles = [0, 45, 90];
let currentRotationIndex = 0;

function rotateSlider() {
    currentRotationIndex = (currentRotationIndex + 1) % rotationAngles.length;
    document.getElementById('volumeSlider').style.transform = `rotate(${rotationAngles[currentRotationIndex]}deg)`;
}

// Mover para posição aleatória
function moveSliderToRandomPosition() {
    let containerRect = container.getBoundingClientRect();
    let controlWidth = control.offsetWidth;
    let controlHeight = control.offsetHeight;

    let randomX = Math.random() * (containerRect.width - controlWidth);
    let randomY = Math.random() * (containerRect.height - controlHeight);

    control.style.left = `${randomX}px`;
    control.style.top = `${randomY}px`;
}

document.getElementById('increaseBtn').addEventListener('click', function() {
    let slider = document.getElementById('volumeSlider');
    let currentWidth = parseInt(window.getComputedStyle(slider).width);
    if (currentWidth < 600) { // Limite máximo de 600px
        slider.style.width = (currentWidth + 10) + 'px';
    }
    if (slider.value < slider.max) {
        slider.value = parseInt(slider.value) + 1;
    }
    document.body.style.backgroundColor = getRandomColor();
    rotateSlider();
    moveSliderToRandomPosition();
});

document.getElementById('decreaseBtn').addEventListener('click', function() {
    let slider = document.getElementById('volumeSlider');
    let currentWidth = parseInt(window.getComputedStyle(slider).width);
    if (currentWidth > 50) { // Limite mínimo de 50px
        slider.style.width = (currentWidth - 10) + 'px';
    }
    if (slider.value > slider.min) {
        slider.value = parseInt(slider.value) - 1;
    }
    document.body.style.backgroundColor = getRandomColor();
    rotateSlider();
    moveSliderToRandomPosition();
});

