let codey;

function preload() {
  
}

let circleArray = [];

function create() {
  for (let i = 0; i < 1000; i++) {
    let randomX = Math.random() * 400;
    let randomY = Math.random() * 400;
    circleArray.push([this.add.circle(randomX, randomY, 12, 0x0080FF), this.add.circle(randomX, randomY, 8, 0xFFFFFF)]);
  }
}

// Create your update() function here

function update() {
  for (let particle of circleArray) {
    let randomX = Math.random() * 400;
    let randomY = Math.random() * 400;
    particle[0].x = randomX;
    particle[0].y = randomY;
    particle[1].x = randomX;
    particle[1].y = randomY;
  }
}

const config = {
	type: Phaser.AUTO,
	width: 400,
	height: 400,
	backgroundColor: "#5f2a55",
	scene: {
    preload,
    create,
    update
    // Include update here!
	}
}

const game = new Phaser.Game(config)
