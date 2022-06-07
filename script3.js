const canvas = document.querySelector('.Logo_Matrix');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;
canvas.style.border = '0px solid white';

const myImage = new Image();
myImage.src = '/logo_only_text.png';

myImage.addEventListener('load', function() {
    ctx.drawImage(myImage, 0, 0, canvas.width, canvas.height);
    const pixels = ctx.getImageData(0,0,canvas.width,canvas.height);
    
    let particlesArray = [];
    const numberOfParticles = 1500;
    
    let mappedImage = [];
    for (let y = 0; y < canvas.height; y++) {
    let row = [];
    for (let x = 0; x < canvas.width; x++) {
      const red = pixels.data[(y * 4 * pixels.width) + (x * 4)];
      const green = pixels.data[(y * 4 * pixels.width) + (x * 4 + 1)];
      const blue = pixels.data[(y * 4 * pixels.width) + (x * 4 + 2)];
        const brightness = calculateRelativeBrightness(red, green, blue);
        const cell = [
        cellBrightness = brightness,
        ];
        row.push(cell);
    }
    mappedImage.push(row);
}

function calculateRelativeBrightness(red, green, blue) {
    return Math.sqrt(
      (red * red) * 0.299 + 
      (green * green) * 0.587 + 
      (blue * blue) * 0.114
        ) / 100;
    }
    
    class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
        this.y = 0;
        this.speed = 0;
      this.velocity = Math.random() * 1.5;
      this.size = Math.random() * 1.5 + 1;
        this.position1 = Math.floor(this.y);
        this.position2 = Math.floor(this.x);
        this.characters = ['D', 'J', 'A', 'R', 'U', 'N'];
      this.randomChar = this.characters[Math.trunc(Math.random() * this.characters.length)];
    }
    update() {
        this.position1 = Math.floor(this.y);
        this.position2 = Math.floor(this.x);
        this.speed = mappedImage[this.position1][this.position2][0];
        let movement = (2.5 - this.speed) + this.velocity;
        
        this.y += movement;
        if (this.y > canvas.height) {
        this.y = 0;
        this.x = Math.random() * canvas.width;
        }
    }
    // draw() {
    //   ctx.beginPath();
    //   // ctx.fillStyle = 'rgba(83,125,150,0.5';
    //   ctx.fillStyle = 'lime';
    //   ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    //   ctx.fill();
    //   ctx.closePath();
    // }
    draw() {
        ctx.font = "12px Consolas";
        ctx.fillStyle = 'lime';
        ctx.fillText(this.randomChar, this.x, this.y);
    }
    }
    function init() {
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
    }
    init();
    function animate() {
    // ctx.drawImage(myImage, 0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 0.05;
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.globalAlpha = 0.2;
    particlesArray.forEach((particle, index) => {
        particle.update();
      ctx.globalAlpha = particlesArray[index].speed * 0.75;
        particle.draw();
    });
    requestAnimationFrame(animate);
    }
    animate();
});