//jshint esversion:8

const game = {};

class Stage extends Phaser.Scene {
  constructor(key) {
    super(key);
    this.levelName = key;
    this.songPath = "";
    this.map = [];
    Object.assign(this, level);
  }

  preload() {
    this.getSong();
  }

  async getSong() {
    game.songLoaded = false;
    game.audioContext = new window.AudioContext();
    //this.load.audio(this.levelName, this.songPath);
    game.song = await this.loadSong(this.songPath);
  }

  async loadSong(url) {
    let request = new XMLHttpRequest();
    let audioBuffer = new Promise((resolve) => {
      request.open("GET", url, true);
      request.responseType = "arraybuffer";
      // When loaded, decode the data and play the sound
      request.onload = function () {
        game.audioContext.decodeAudioData(
          request.response,
          function (buffer) {
            //console.log("Song loaded");
            resolve(buffer);
            game.songLoaded = true;
          },
          (e) => console.log(e)
        );
      };
      request.send();
    });
    return audioBuffer;
  }

  create() {
    game.t = 0;
    game.flicker = 0;

    game.audioPlaying = false;
    game.cursors = this.input.keyboard.createCursorKeys();
    game.shift = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SHIFT
    );

    let col = (c) => Phaser.Display.Color.GetColor(...c);

    game.player = this.physics.add.group();
    let playerGlow = this.add.pointlight(
      300,
      300,
      col(save.player.color),
      10,
      0.1,
      0.09
    );
    let playerOutline = this.add.ellipse(
      300,
      300,
      13,
      13,
      col(save.player.color)
    );
    let playerCenter = this.add.ellipse(
      300,
      300,
      10,
      10,
      col(save.player.color)
    );
    let playerHitbox = this.add.ellipse(
      300,
      300,
      settings.hitboxRadius,
      settings.hitboxRadius,
      col(save.player.color)
    )
    game.player.add(playerGlow);
    game.player.add(playerOutline);
    game.player.add(playerCenter);
    game.player.add(playerHitbox);

    game.bullets = this.physics.add.group();
    game.bulletEffects = this.physics.add.group();
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
      game.bullets.add(singlebullet);
    }

    game.bulletEffects = this.physics.add.group();
    for (let singlebullet of game.bullets.getChildren()) {
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
      game.bulletEffects.add(singlebulleteffect);
    }
    */

    this.physics.add.overlap(
      game.bullets,
      game.player.getChildren()[3],
      (player, bullet) => {
        //console.log("die");
        if (bullet instanceof Bullet) {
          bullet.destroy();
        }
      }
    );

    game.guiBackground = this.add.rectangle(750, 300, 300, 600, 0x000000);
    game.guiBackground.depth = 100;

    //game.song = this.sound.add(this.levelName);
    //game.song.play();

    /*
    var audioContext = new window.AudioContext();
    var analyser = audioContext.createAnalyser();
    
    analyser.connect(audioContext.destination);
    var source = audioContext.createMediaStreamSource(game.song);
    
    
    /*
    game.soundAmp = this.sound.context.createAnalyzer();
    game.song.volumeNode.connect(game.soundAmp);
    game.soundAmp.connect(this.sound.context.destination);
    */
    game.sound = {};
    game.sound.sourceNode = game.audioContext.createBufferSource();
    game.sound.analyserNode = game.audioContext.createAnalyser();
    game.sound.javascriptNode = game.audioContext.createScriptProcessor(
      1024,
      1,
      1
    ); //change 1024?
    game.sound.amplitudeArray = new Uint8Array(
      game.sound.analyserNode.frequencyBinCount
    );
    game.sound.sourceNode.connect(game.audioContext.destination);
    game.sound.sourceNode.connect(game.sound.analyserNode);
    game.sound.analyserNode.connect(game.sound.javascriptNode);
    game.sound.javascriptNode.connect(game.audioContext.destination);
    //console.log(game.song);
    
    game.level = this.run();
    game.level.push([9999999, ""]);
  }

  createBullet(x, y, vx, vy, r, delay, grav = 0.01, color = 0x0080ff, dec = false, life = 999999, para = false) {
    let singlebullet = this.add.bullet(x, y, vx, vy, r, delay, grav, color, dec, life, para);
    singlebullet.depth = 3;
    game.bullets.add(singlebullet);
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
    game.bulletEffects.add(singlebulleteffect);
  }

  update() {
    if (game.audioPlaying) {
      game.t++;
    }
    /*
    if (game.t % 10 == 0) {
      for (let i = 0; i < 2 * Math.PI; i += Math.PI / 10)
      this.createBullet(
        200,
        200,
        Math.cos(i * 1 + game.t) * 3,
        Math.sin(i * 1 + game.t) * 3,
        4,
        0,
        0,
        0x0080ff
      );
    }*/
    
    if (game.t % (settings.songRefreshRate * 60) == settings.songRefreshRate * 60 - 1) {
      game.sound.sourceNode.stop();
      game.sound.sourceNode = game.audioContext.createBufferSource();
      game.sound.sourceNode.connect(game.audioContext.destination);
      game.sound.sourceNode.connect(game.sound.analyserNode);
      game.sound.sourceNode.buffer = game.song;
      game.sound.sourceNode.start(0, game.t / 60);
    }
    
    let collectingBulletPatterns = true;
    if (game.level.length > 1) {
      while (collectingBulletPatterns) {
        if (game.level[0][0] == game.t) {
          let newBullets = game.level.shift();
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
                game.bullets.add(newWarning);
                break;
              case "lineWarning":
                newWarning = this.add.lineWarning(...newBullet[1]);
                game.bullets.add(newWarning);
                break;
            }
          }
        } else if (game.level[0][0] < game.t) {
          game.level.shift();
        } else {
          collectingBulletPatterns = false;
        }
      }
    }
    //console.log(game.bullets.getLength());
    
    //console.log(game.songLoaded);
    if (game.songLoaded && !game.audioPlaying) {
      //console.log("song playing");
      game.sound.sourceNode.buffer = game.song;
      //console.log(game.sound.sourceNode);
      game.sound.sourceNode.start(0);
      game.audioPlaying = true;
    }

    if (game.audioPlaying) {
      game.sound.analyserNode.getByteTimeDomainData(game.sound.amplitudeArray);
      let max = Math.max(...game.sound.amplitudeArray);
      //console.log((max - 128) / 128)
      //game.flicker = 1 / (1.25 + Math.exp(((max - 128) / 128 - 0.8) * -15)) + 0.2;
      game.flicker = ((max - 128) / 128) * 0.8 + 0.2;
    } else {
      game.flicker = 0.2;
    }

    //console.log(game.bullets.getLength());

    // 1st pass, actual bullets
    for (let singlebullet of game.bullets.getChildren()) {
      if (singlebullet.exited || singlebullet.life <= 0) {
        game.bullets.remove(singlebullet, true, true);
        continue;
      }
      singlebullet.move();
      if (singlebullet instanceof CircleWarning || singlebullet instanceof LineWarning) {
        if (singlebullet.length >= singlebullet.fullLength) {
          game.bullets.remove(singlebullet, true, true);
        }
      }
    }
    // 2nd pass, bullet glow/outline
    for (let singlebulleteffects of game.bulletEffects.getChildren()) {
      if (singlebulleteffects.parent.active) {
        //singlebulleteffects.draw();
        singlebulleteffects.visible = singlebulleteffects.parent.visible;
        singlebulleteffects.x = singlebulleteffects.parent.x;
        singlebulleteffects.y = singlebulleteffects.parent.y;
      } else {
        game.bulletEffects.remove(singlebulleteffects, true, true);
      }
    }

    //game.flicker = Math.sin(game.t / 10) * 0.5 + 0.5;

    game.player.getChildren()[0].radius = 20 * game.flicker + 10;
    game.player.getChildren()[0].intensity = 0.1 * game.flicker + 0.1;
    game.player.getChildren()[2].fillColor = Phaser.Display.Color.GetColor(
      Phaser.Math.Interpolation.Linear(
        [30, save.player.color[0]],
        game.flicker * 0.3 + 0.7
      ),
      Phaser.Math.Interpolation.Linear(
        [30, save.player.color[1]],
        game.flicker * 0.3 + 0.7
      ),
      Phaser.Math.Interpolation.Linear(
        [70, save.player.color[2]],
        game.flicker * 0.3 + 0.7
      )
    );

    //console.log(game.bulletEffects.getChildren().length);

    let trueSpeed;
    if (game.shift.isDown) {
      trueSpeed = settings.speed * 0.5;
    } else {
      trueSpeed = settings.speed;
    }

    if (game.cursors.left.isDown && game.player.getChildren()[0].x > 13) {
      game.player.setVelocityX(-trueSpeed);
    } else if (
      game.cursors.right.isDown &&
      game.player.getChildren()[0].x < 600 - 13
    ) {
      game.player.setVelocityX(trueSpeed);
    } else {
      game.player.setVelocityX(0);
    }
    if (game.cursors.up.isDown && game.player.getChildren()[0].y > 13) {
      game.player.setVelocityY(-trueSpeed);
    } else if (
      game.cursors.down.isDown &&
      game.player.getChildren()[0].y < 600 - 13
    ) {
      game.player.setVelocityY(trueSpeed);
    } else {
      game.player.setVelocityY(0);
    }
  }
}
