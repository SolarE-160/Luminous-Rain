class MainMenu extends Phaser.Scene {
  constructor() {
    super("Main Menu");
    Object.assign(this, musicScenes);
  }
  
  preload() {
    this.load.image("bb", "assets/bb.png");
    this.getSong("songs/0f.mp3");
  }
  
  button(x, y, w, h, text, callback, tooltipText="") {
    let buttonFrame = this.add.rectangle(x, y, w, h, 0x646496).setStrokeStyle(10, 0x505082).setScrollFactor(0.1);
    /*
    let buttonFrame = this.graphics.fillRoundedRect(x - w / 2, y - h / 2, w, h, 20);
    let buttonOutline = this.graphics.strokeRoundedRect(x - w / 2, y - h / 2, w, h, 20);
    */
    let buttonText = this.add.text(x, y, text, {
      fontSize: h - 24,
      align: "center",
      color: "#f0f076",
      stroke: "#505082",
      strokeThickness: 10,
    }).setShadow(0, 0, "#f0f076", 20).setOrigin(0.5, 0.5).setScrollFactor(0.1);
    buttonFrame.setInteractive({
      useHandCursor: true,
    })
      .on("pointerover", () => {
      buttonFrame.scale = 1.1;
      buttonText.scale = 1.1;
    })
      .on("pointerout", () => {
      buttonFrame.scale = 1;
      buttonText.scale = 1;
    })
      .on("pointerdown", callback);
  }
  
  
  hueToInt(h) {
    let newCol = Phaser.Display.Color.HSLToColor(h, 1, 0.5);
    let newColRep = Phaser.Display.Color.GetColor(newCol.r, newCol.g, newCol.b);
    return newColRep;
  }
  
  intToHue(i) {
    let newCol = Phaser.Display.Color.IntegerToRGB(i);
    let newColRep = Phaser.Display.Color.RGBToHSV(newCol.r, newCol.g, newCol.b);
    return newColRep.h;
  }
  
  mulberry32(a) {
    return function() {
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
  }
  
  goto(scene) {
    return () => {
      this.cameras.main.fadeOut(1000, 0, 0, 0, (c, t) => {
        this.sound.gainNode.gain.value = 1 - t;
      });
      this.songLoaded = false;
      this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
      if (this.audioPlaying) {
        this.sound.sourceNode.stop();
      }
      this.scene.stop();
      this.scene.start(scene);
	})
    }
  }
  
  create() {
    this.audioPlaying = false;
    
    this.bbBack = this.add.particles("bb").setDepth(-100);
    this.bbFront = this.add.particles("bb").setDepth(100);
    let rainConfig = {
      x: {min: -50, max: 950},
      y: -30,
      lifespan: 4000,
      speedX: 0,
      accelerationX: 0,
      quantity: 1,
      frequency: 90,
      //tint: {min: 0x000000, max: 0xffffff},
      blendMode: "ADD",
      bounds: {x: -50, y: -50, w: 1000, h: 647},
      collideBottom: true,
      bounce: {min: 0.2, max: 0.3},
    };
    this.luminousRainfall = [
      this.bbBack.createEmitter({
        x: {min: -50, max: 950},
        y: -30,
        lifespan: 4000,
        speedX: 0,
        accelerationX: 0,
        quantity: 1,
        frequency: 90,
        //tint: {min: 0x000000, max: 0xffffff},
        blendMode: "ADD",
        bounds: {x: -50, y: -50, w: 1000, h: 557},
        collideBottom: true,
        bounce: {min: 0.2, max: 0.3},
        speedY: {min: 80, max: 100},
        accelerationY: {min: 150, max: 200},
        scale: 0.08
      }).setScrollFactor(0.02),
      this.bbBack.createEmitter({
        x: {min: -50, max: 950},
        y: -30,
        lifespan: 4000,
        speedX: 0,
        accelerationX: 0,
        quantity: 1,
        frequency: 90,
        //tint: {min: 0x000000, max: 0xffffff},
        blendMode: "ADD",
        bounds: {x: -50, y: -50, w: 1000, h: 587},
        collideBottom: true,
        bounce: {min: 0.2, max: 0.3},
        speedY: {min: 100, max: 200},
        accelerationY: {min: 200, max: 250},
        scale: 0.1
      }).setScrollFactor(0.05),
      this.bbFront.createEmitter({
        x: {min: -50, max: 950},
        y: -30,
        lifespan: 4000,
        speedX: 0,
        accelerationX: 0,
        quantity: 1,
        frequency: 90,
        //tint: {min: 0x000000, max: 0xffffff},
        blendMode: "ADD",
        bounds: {x: -50, y: -50, w: 1000, h: 617},
        collideBottom: true,
        bounce: {min: 0.2, max: 0.3},
        speedY: {min: 200, max: 300},
        accelerationY: {min: 250, max: 300},
        scale: 0.15
      }).setScrollFactor(0.2),
      this.bbFront.createEmitter({
        x: {min: -50, max: 950},
        y: -30,
        lifespan: 4000,
        speedX: 0,
        accelerationX: 0,
        quantity: 1,
        frequency: 90,
        //tint: {min: 0x000000, max: 0xffffff},
        blendMode: "ADD",
        bounds: {x: -50, y: -50, w: 1000, h: 647},
        collideBottom: true,
        bounce: {min: 0.2, max: 0.3},
        speedY: {min: 300, max: 400},
        accelerationY: {min: 300, max: 350},
        scale: 0.2
      }).setScrollFactor(0.4),
    ];
    
    for (let rainEmitter of this.luminousRainfall) {
      rainEmitter.setTint((p, k, t) => {
        let colorRand = this.mulberry32(p.x)();
        return this.hueToInt(t + colorRand);
        //return this.hueToInt(Math.max(0, Math.min(1, 1.4 * (t))));
      });
      rainEmitter.setAlpha((p, k, t) => {
        if (t > 0.6) {
          return (1 - t) / 0.8;
        } else {
          return 0.5
        }
      });
    }
    this.titleText = [];
    for (let i = 0; i < 3; i++) { //change title text glow strength
      this.titleText[i] = this.add.text(450, 120, "Luminous Rain", {
        fontSize: 100,
        align: "center",
        color: "#f0f076",
        stroke: "#f0f076",
        strokeThickness: 1,
        padding: {
          x: 60,
          y: 60
        }
      }).setShadow(0, 0, "#f0f076", 20).setOrigin(0.5, 0.5).setScrollFactor(0.1);
      
    }
    this.button(450, 300, 700, 80, "Play", this.goto("Altale"));
    this.button(275, 400, 350, 60, "Bottom text", () => {
      if (this.sound.gainNode.gain.value == 1) {
        this.sound.gainNode.gain.value = 0;
      } else {
        this.sound.gainNode.gain.value = 1;
      }
    });
    this.button(625, 400, 350, 60, "Other level", this.goto("Kronos"));
    
    //this.buttonShadow = this.add.rectangle(450, 530, 700, 6, 0x444444, 0.2).setScrollFactor(0.1);
    
    this.initSound();
    this.ampVal = 0;
    this.sound.gainNode.gain.value = 1;
  }
  
  update() {
    if (this.songLoaded && !this.audioPlaying) {
      //console.log("song playing");
      this.sound.sourceNode.buffer = this.song;
      //console.log(this.sound.sourceNode);
      this.sound.sourceNode.start(0, 15.9);
      this.sound.sourceNode.loop = true;
      this.sound.sourceNode.loopStart = 15.9;
      this.audioPlaying = true;
    }
    
    this.setFlicker();
    
    /*
    this.cameras.main.scrollX = (this.input.mousePointer.x - 450) * 0.3;
    this.cameras.main.scrollY = (this.input.mousePointer.y - 300) * 0.3;
    */
    this.cameras.main.pan((this.input.mousePointer.x + 910) * 0.3, (this.input.mousePointer.y + 700) * 0.3, 100, Phaser.Math.Easing.Quadratic.InOut, true);
    
    
    this.titleText[0].setStroke("#f0f076", this.flicker * 6);
    for (let singleText of this.titleText) {
      singleText.setShadowBlur(this.flicker * 30);
    }
    this.luminousRainfall[0].setScale(this.flicker * 0.15 + 0.08);
    this.luminousRainfall[1].setScale(this.flicker * 0.2 + 0.1);
    this.luminousRainfall[2].setScale(this.flicker * 0.3 + 0.15);
    this.luminousRainfall[3].setScale(this.flicker * 0.4 + 0.2);
  }
}