//jshint esversion:8

//const game = {};

class Stage extends Phaser.Scene {
  constructor(key) {
    super(key);
    this.levelName = key;
    this.songPath = "";
    this.map = [];
    Object.assign(this, level);
    Object.assign(this, musicScenes);
  }

  preload() {
    this.load.image("bb", "bb.png");
    this.getSong(this.songPath);
  }

  create() {
    this.t = 0;
    this.flicker = 0;

    this.audioPlaying = false;
    this.cursors = this.input.keyboard.createCursorKeys();
    this.shift = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SHIFT
    );


    this.player = this.physics.add.group();
    let playerGlow = this.add.pointlight(
      300,
      400,
      col(save.player.color),
      10,
      0.1,
      0.09
    );
    let playerOutline = this.add.ellipse(
      300,
      400,
      13,
      13,
      col(save.player.color)
    );
    let playerCenter = this.add.ellipse(
      300,
      400,
      10,
      10,
      col(save.player.color)
    );
    let playerHitbox = this.add.ellipse(
      300,
      400,
      settings.hitboxRadius,
      settings.hitboxRadius,
      col(save.player.color)
    )
    this.player.add(playerGlow);
    this.player.add(playerOutline);
    this.player.add(playerCenter);
    this.player.add(playerHitbox);

    this.bullets = this.physics.add.group();
    this.bulletEffects = this.physics.add.group();
    /*
    for (let i = 0; i < 100; i++) {
      let singlebullet = this.add.bullet(
        Math.random() * 800,
        Math.random() * 600,
        Math.random() * 10 - 5,
        Math.random() * 10 - 5,
        4,
        0,
        0,
        0x0080ff
      );
      singlebullet.depth = 3;
      this.bullets.add(singlebullet);
    }

    this.bulletEffects = this.physics.add.group();
    for (let singlebullet of this.bullets.getChildren()) {
      if (!singlebullet.active) {
        continue;
      }
      let singlebulleteffect;
      if (settings.glow) {
        singlebulleteffect = this.add.pointlight(
          singlebullet.x,
          singlebullet.y,
          singlebullet.color,
          singlebullet.width * 2,
          0.6,
          0.07
        );
      } else {
        singlebulleteffect = this.add.ellipse(
          singlebullet.x,
          singlebullet.y,
          singlebullet.width * 1.6,
          singlebullet.width * 1.6,
          singlebullet.color
        );
      }
      singlebulleteffect.parent = singlebullet;
      singlebulleteffect.depth = 2;
      this.bulletEffects.add(singlebulleteffect);
    }
    */

    this.physics.add.overlap(
      this.bullets,
      this.player.getChildren()[3],
      (player, bullet) => {
        //console.log("die");
        if (bullet instanceof Bullet && !bullet.dec) {
          bullet.destroy();
        }
      }
    );

    this.guiBackground = this.add.rectangle(750, 300, 300, 600, 0x000000);
    this.guiBackground.depth = 100;

    //this.song = this.sound.add(this.levelName);
    //this.song.play();

    /*
    var audioContext = new window.AudioContext();
    var analyser = audioContext.createAnalyser();
    
    analyser.connect(audioContext.destination);
    var source = audioContext.createMediaStreamSource(this.song);
    
    
    /*
    this.soundAmp = this.sound.context.createAnalyzer();
    this.song.volumeNode.connect(this.soundAmp);
    this.soundAmp.connect(this.sound.context.destination);
    */
    this.initSound();
    //console.log(this.song);
    
    this.bb = this.add.particles("bb");
    
    this.loadingCircle = this.bb.createEmitter({
      tint: 0x0080ff,
      x: 300,
      y: 300,
      scale: {start: 0.4, end: 0, ease: Phaser.Math.Easing.Quintic.Out},
      blendMode: "ADD",
      frequency: 30,
      emitZone: {
        type: "edge",
        source: new Phaser.Geom.Circle(0, 0, 40),
        quantity: 24,
        yoyo: false,
      },
    });
    
    this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    
    
    this.level = this.run();
    this.level.push([9999999, ""]);
  }

  createBullet(x, y, vx, vy, r, delay, grav = 0.01, color = 0x0080ff, dec = false, life = 999999, para = false) {
    let singlebullet = this.add.bullet(x, y, vx, vy, r, delay, grav, color, dec, life, para);
    singlebullet.depth = 3;
    this.bullets.add(singlebullet);
    if (!singlebullet.active) {
      return;
    }
    let singlebulleteffect;
    if (settings.glow) {
      singlebulleteffect = this.add.pointlight(
        singlebullet.x,
        singlebullet.y,
        singlebullet.color,
        singlebullet.width * 2,
        0.6,
        0.07
      );
    } else {
      singlebulleteffect = this.add.ellipse(
        singlebullet.x,
        singlebullet.y,
        singlebullet.width * 1.6,
        singlebullet.width * 1.6,
        singlebullet.color
      );
    }
    singlebulleteffect.parent = singlebullet;
    singlebulleteffect.depth = 2;
    this.bulletEffects.add(singlebulleteffect);
  }

  update() {
    if (this.keyP.isDown) {
      this.scene.stop();
      this.scene.start("Main Menu");
    }
    if (this.t >= 7500) {
      //this.scene.pause();
    }
    if (this.audioPlaying) {
      this.t++;
    }
    /*
    if (this.t % 10 == 0) {
      for (let i = 0; i < 2 * Math.PI; i += Math.PI / 10)
      this.createBullet(
        200,
        200,
        Math.cos(i * 1 + this.t) * 3,
        Math.sin(i * 1 + this.t) * 3,
        4,
        0,
        0,
        0x0080ff
      );
    }*/
    
    if (this.t % (settings.songRefreshRate * 60) == settings.songRefreshRate * 60 - 1) {
      this.sound.sourceNode.stop();
      this.sound.sourceNode = this.audioContext.createBufferSource();
      this.sound.sourceNode.connect(this.audioContext.destination);
      this.sound.sourceNode.connect(this.sound.analyserNode);
      this.sound.sourceNode.buffer = this.song;
      this.sound.sourceNode.start(0, this.t / 60);
    }
    
    let collectingBulletPatterns = true;
    if (this.level.length > 1) {
      while (collectingBulletPatterns) {
        if (this.level[0][0] == this.t) {
          let newBullets = this.level.shift();
          //console.log(newBullets);
          for (let newBullet of newBullets[1]) {
            let newWarning;
            switch (newBullet[0]) {
              case "bullet":
                //console.log(newBullet[1]);
                this.createBullet(...newBullet[1]);
                break;
              case "circleWarning":
                newWarning = this.add.circleWarning(...newBullet[1]);
                this.bullets.add(newWarning);
                break;
              case "lineWarning":
                newWarning = this.add.lineWarning(...newBullet[1]);
                this.bullets.add(newWarning);
                break;
            }
          }
        } else if (this.level[0][0] < this.t) {
          this.level.shift();
        } else {
          collectingBulletPatterns = false;
        }
      }
    }
    //console.log(this.bullets.getLength());
    
    //console.log(this.songLoaded);
    if (this.songLoaded && !this.audioPlaying) {
      //console.log("song playing");
      this.sound.sourceNode.buffer = this.song;
      //console.log(this.sound.sourceNode);
      this.sound.sourceNode.start(0);
      this.audioPlaying = true;
      this.loadingCircle.stop();
    }

    if (this.audioPlaying) {
      this.sound.analyserNode.getByteTimeDomainData(this.sound.amplitudeArray);
      let max = Math.max(...this.sound.amplitudeArray);
      //console.log((max - 128) / 128)
      //this.flicker = 1 / (1.25 + Math.exp(((max - 128) / 128 - 0.8) * -15)) + 0.2;
      this.flicker = ((max - 128) / 128) * 0.8 + 0.2;
    } else {
      this.flicker = 0.2;
    }

    //console.log(this.bullets.getLength());

    // 1st pass, actual bullets
    for (let singlebullet of this.bullets.getChildren()) {
      if (singlebullet.exited || singlebullet.life <= 0) {
        this.bullets.remove(singlebullet, true, true);
        continue;
      }
      singlebullet.move();
      if (singlebullet instanceof CircleWarning || singlebullet instanceof LineWarning) {
        if (singlebullet.length >= singlebullet.fullLength) {
          this.bullets.remove(singlebullet, true, true);
        }
      }
    }
    // 2nd pass, bullet glow/outline
    for (let singlebulleteffects of this.bulletEffects.getChildren()) {
      if (singlebulleteffects.parent.active) {
        //singlebulleteffects.draw();
        singlebulleteffects.visible = singlebulleteffects.parent.delay <= 0;
        singlebulleteffects.x = singlebulleteffects.parent.x;
        singlebulleteffects.y = singlebulleteffects.parent.y;
      } else {
        this.bulletEffects.remove(singlebulleteffects, true, true);
      }
    }

    //this.flicker = Math.sin(this.t / 10) * 0.5 + 0.5;

    this.player.getChildren()[0].radius = 20 * this.flicker + 10;
    this.player.getChildren()[0].intensity = 0.1 * this.flicker + 0.1;
    this.player.getChildren()[2].fillColor = Phaser.Display.Color.GetColor(
      Phaser.Math.Interpolation.Linear(
        [30, save.player.color[0]],
        this.flicker * 0.3 + 0.7
      ),
      Phaser.Math.Interpolation.Linear(
        [30, save.player.color[1]],
        this.flicker * 0.3 + 0.7
      ),
      Phaser.Math.Interpolation.Linear(
        [70, save.player.color[2]],
        this.flicker * 0.3 + 0.7
      )
    );

    //console.log(this.bulletEffects.getChildren().length);

    let trueSpeed;
    if (this.shift.isDown) {
      trueSpeed = settings.speed * 0.5;
    } else {
      trueSpeed = settings.speed;
    }

    if (this.cursors.left.isDown && this.player.getChildren()[0].x > 13) {
      this.player.setVelocityX(-trueSpeed);
    } else if (
      this.cursors.right.isDown &&
      this.player.getChildren()[0].x < 600 - 13
    ) {
      this.player.setVelocityX(trueSpeed);
    } else {
      this.player.setVelocityX(0);
    }
    if (this.cursors.up.isDown && this.player.getChildren()[0].y > 13) {
      this.player.setVelocityY(-trueSpeed);
    } else if (
      this.cursors.down.isDown &&
      this.player.getChildren()[0].y < 600 - 13
    ) {
      this.player.setVelocityY(trueSpeed);
    } else {
      this.player.setVelocityY(0);
    }
  }
}
