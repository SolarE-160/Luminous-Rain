const game = {};

class Stage extends Phaser.Scene {
  constructor(key) {
    super(key);
    this.levelName = key;
    this.songPath = ""
  }

  preload() {
    this.load.audio(this.levelName, this.songPath);
  }

  create() {
    game.t = 0;
    game.flicker = 0;
    
    game.cursors = this.input.keyboard.createCursorKeys();
    game.shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    
    let col = c => Phaser.Display.Color.GetColor(...c);
    
    game.player = this.physics.add.group();
    let playerGlow = this.add.pointlight(300, 300, col(save.player.color), 10, 0.1);
    let playerOutline = this.add.ellipse(300, 300, 13, 13, col(save.player.color));
    let playerCenter = this.add.ellipse(300, 300, 10, 10, col(save.player.color));
    game.player.add(playerGlow);
    game.player.add(playerOutline);
    game.player.add(playerCenter);
    
    game.bullets = this.physics.add.group();
    for (let i = 0; i < 100; i++) {
      let singlebullet = this.add.bullet(
        Math.random() * 800,
        Math.random() * 600,
        Math.random() * 10 - 5,
        Math.random() * 10 - 5,
        4,
        0,
        0
      );
      singlebullet.depth = 3;
      game.bullets.add(singlebullet);
    }
    
    game.bulletEffects = this.physics.add.group();
    for (let singlebullet of game.bullets.getChildren()) {
      let singlebulleteffect;
      if (settings.glow) {
        singlebulleteffect = this.add.bulletGlow(
          singlebullet.x,
          singlebullet.y,
          singlebullet.vx,
          singlebullet.vy,
          singlebullet.width / 2,
          singlebullet.delay,
          singlebullet.grav,
          singlebullet.color
        );
      } else {
        singlebulleteffect = this.add.bullet(
          singlebullet.x,
          singlebullet.y,
          singlebullet.vx,
          singlebullet.vy,
          singlebullet.r * 1.6,
          singlebullet.delay,
          singlebullet.grav,
          singlebullet.color
        );
        
        singlebulleteffect.fillColor = singlebullet.color;
      }
      singlebulleteffect.parent = singlebullet;
      singlebulleteffect.depth = 2;
      game.bulletEffects.add(singlebulleteffect);
    }
    
    this.physics.add.overlap(game.bullets, game.player.getChildren()[2], (player, bullet) => {
      //console.log("die");
      bullet.destroy();
    });
    
    
    game.song = this.sound.add(this.levelName);
    game.song.play();
    
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
  }

  update() {
    // 1st pass, actual bullets
    for (let singlebullet of game.bullets.getChildren()) {
      singlebullet.draw();
    }
    // 2nd pass, bullet glow/outline
    for (let singlebulleteffects of game.bulletEffects.getChildren()) {
      if (singlebulleteffects.parent.active) {
        singlebulleteffects.draw();
        singlebulleteffects.x = singlebulleteffects.parent.x;
        singlebulleteffects.y = singlebulleteffects.parent.y;
      } else {
        game.bulletEffects.remove(singlebulleteffects, true, true);
      }
    }
    
    game.flicker = Math.sin(game.t / 10) * 0.5 + 0.5;
    
    game.player.getChildren()[0].radius = 20 * game.flicker + 10;
    game.player.getChildren()[0].intensity = 0.1 * game.flicker + 0.1;
    game.player.getChildren()[2].fillColor = Phaser.Display.Color.GetColor(
      Phaser.Math.Interpolation.Linear([30, save.player.color[0]], game.flicker * 0.5 + 0.5),
      Phaser.Math.Interpolation.Linear([30, save.player.color[1]], game.flicker * 0.5 + 0.5),
      Phaser.Math.Interpolation.Linear([70, save.player.color[2]], game.flicker * 0.5 + 0.5)
    );
    game.t++;
    
    //console.log(game.bulletEffects.getChildren().length);
    
    let trueSpeed;
    if (game.shift.isDown) {
      trueSpeed = settings.speed * 0.5;
    } else {
      trueSpeed = settings.speed;
    }
    
    if (game.cursors.left.isDown) {
      game.player.setVelocityX(-trueSpeed);
    } else if (game.cursors.right.isDown) {
      game.player.setVelocityX(trueSpeed);
    } else {
      game.player.setVelocityX(0);
    }
    if (game.cursors.up.isDown) {
      game.player.setVelocityY(-trueSpeed);
    } else if (game.cursors.down.isDown) {
      game.player.setVelocityY(trueSpeed);
    } else {
      game.player.setVelocityY(0);
    }
  }
}
