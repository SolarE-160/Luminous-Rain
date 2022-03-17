const outerBoxMargin = 50; // how far beyond edge of canvas can bullets still exist :

// mixin object that provides movement to the bullets
let movingObject = {
  move(trate = 1) {
    let rate = trate;
    if (this.delay <= 0) {
      this.glow.visible = true;
      this.life--;
      if (!this.dec) {
        this.visible = true;
      } else {
        this.visible = false;
      }
      this.active = true;
      if (!this.para) {
        this.x += this.vx * rate;
        this.y += this.vy * rate;
        this.vy += this.grav * rate;
      } else {
        this.x = this.para(this.t)[0];
        this.y = this.para(this.t)[1];
        this.t += rate;
      }
      this.glow.x = this.x;
      this.glow.y = this.y;
      if (
        this.x < -outerBoxMargin ||
        this.x > 600 + outerBoxMargin ||
        this.y < -outerBoxMargin ||
        this.y > 600 + outerBoxMargin
      ) {
        this.exited = true;
        //this.visible = false;
        //this.active = false;
      }
    } else {
      this.delay--;
      this.visible = false;
      this.glow.visible = false;
    }
  },
};

class Bullet extends Phaser.GameObjects.Ellipse {
  constructor(scene, x, y, vx, vy, r, delay, grav = 0.01, color = 0x0080ff, dec = false, life = 999999, para = false) {
    super(scene, x, y, r * 2, r * 2, 0xffffff);
    this.vx = vx;
    this.vy = vy;
    this.grav = grav;
    this.color = color;
    this.r = r;
    this.delay = delay;
    this.dec = dec;
    this.life = life;
    this.visible = delay > 0 ? false : true;
    this.exited = false;
    this.t = 0
    this.para = para;
    this.glow = scene.glow.add(scene.add.pointlight(this.x, this.y, this.color, this.r * 4, 0.6, 0.07));
    this.glow.visible = delay > 0 ? false : true;
    Object.assign(this, movingObject);
  }
}


class BulletPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    //  Register our new Game Object type
    pluginManager.registerGameObject("bullet", this.createBullet);
  }

  createBullet(x, y, vx, vy, r, delay, grav = 0.01, color = 0x0080ff, dec = false, life = 999999, para = false) {
    //console.log(color, dec, life);
    return this.displayList.add(
      new Bullet(this.scene, x, y, vx, vy, r, delay, grav, color, dec, life, para)
    );
  }
}

class PulsarBullet extends Bullet {
  constructor(scene, x, y, vx, vy, r, delay, grav = 0, color = 0x0080ff, dec = false, life = 999999, para = false, pulseScale = 16) {
    super(scene, x, y, vx, vy, r, delay, grav, color, dec, life, para);
    this.pulseScale = pulseScale;
    //console.log(pulseScale);
    Object.assign(this, movingObject);
  }
  
  pulse(vol) {
    this.setScale(this.pulseScale * vol / 4);
    this.glow.radius = this.r * 4 + this.pulseScale * vol * 2;
    //console.log(this.scale);
    //console.log(this.pulseScale);
    //console.log(vol);
    this.move();
  }
}

class PulsarBulletPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    //  Register our new Game Object type
    pluginManager.registerGameObject("pulsarBullet", this.createPulsarBullet);
  }

  createPulsarBullet(x, y, vx, vy, r, delay, life = 999999, pulseScale = 16, color = 0x0080ff, dec = false, para = false, grav = 0) {
    //console.log(color, dec, life);
    return this.displayList.add(
      new PulsarBullet(this.scene, x, y, vx, vy, r, delay, grav, color, dec, life, para, pulseScale)
    );
  }
}

class StarBullet extends Phaser.GameObjects.Star {
  constructor(scene, x, y, vx, vy, r, delay, points = 5, rot = 0.02, grav = 0.01, color = 0x0080ff, dec = false, life = 999999, para = false) {
    super(scene, x, y, points, r * 2, r * 4, 0xffffff);
    this.vx = vx;
    this.vy = vy;
    this.grav = grav;
    this.color = color;
    this.r = r;
    this.delay = delay;
    this.dec = dec;
    this.life = life;
    this.visible = delay > 0 ? false : true;
    this.exited = false;
    this.t = 0;
    this.rot = rot;
    this.para = para;
    this.glow = scene.add.pointlight(this.x, this.y, this.color, this.r * 8, 0.4, 0.07);
    this.glow.visible = delay > 0 ? false : true;
    Object.assign(this, movingObject);
  }
  
  rotate() {
    this.rotation += this.rot;
    this.move();
  }
}


class StarBulletPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    //  Register our new Game Object type
    pluginManager.registerGameObject("starBullet", this.createStarBullet);
  }

  createStarBullet(x, y, vx, vy, r, delay, points=5, rot=0.02, grav = 0.01, color = 0x0080ff, dec = false, life = 999999, para = false) {
    //console.log(color, dec, life);
    return this.displayList.add(
      new StarBullet(this.scene, x, y, vx, vy, r, delay, points, rot, grav, color, dec, life, para)
    );
  }
}


class CircleWarning extends Phaser.GameObjects.PointLight {
  constructor(scene, x, y, r, length, delay=0, fadeOut=false, fadeTime=1, alpha=0.5) {
    super(scene, x, y, 0xff0000, r, 0.4);
    this.alpha = 0
    this.length = 0;
    this.fullLength = length;
    this.fadeTime = fadeTime;
    this.maxAlpha = alpha;
    this.delay = delay;
    this.visible = false;
    this.fadeOut = fadeOut;
  }
  
  move(trate=1) {
    if (this.delay < 0) {
      this.visible = true;
      if (this.fullLength * this.fadeTime > this.length) {
        this.setAlpha(this.length / (this.fullLength * this.fadeTime) * this.maxAlpha); 
      } else if (this.fadeOut && this.fullLength * (1 - this.fadeTime) < this.length) {
        this.setAlpha((this.fullLength - this.length) / (this.fullLength * this.fadeTime) * this.maxAlpha);
      } else {
        this.setAlpha(this.maxAlpha);
      }
      this.length++;
    } else {
      this.visible = false;
      this.delay--;
    }
  }
}

class CircleWarningPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    //  Register our new Game Object type
    pluginManager.registerGameObject("circleWarning", this.createCircleWarning);
  }

  createCircleWarning(x, y, r, length, delay=0, fadeOut=false, fadeTime=1, alpha=0.5) {
    return this.displayList.add(
      new CircleWarning(this.scene, x, y, r, length, delay, fadeOut, fadeTime, alpha)
    );
  }
}

class LineWarning extends Phaser.GameObjects.Line {
  constructor(scene, x1, y1, x2, y2, width, length, fadeTime = 0.5, alpha=0.5) {
    let origin = [(x1 + x2) / 2, (y1 + y2) / 2]
    super(scene, 
          origin[0], 
          origin[1], 
          Math.max(0, x1 - x2), 
          Math.max(0, y1 - y2), 
          Math.max(0, x2 - x1), 
          Math.max(0, y2 - y1), 
          0xff0000, 0);
    this.setLineWidth(width);
    this.length = 0;
    this.fullLength = length;
    this.fadeTime = fadeTime;
    this.alpha = alpha;
    //scene.add.pointlight(this.x, this.y, 0xffffff, 10, 0.6, 0.07)
    //scene.add.pointlight(100, 100, 0xff0000, 10, 0.6, 0.07)
  }
  
  move(trate=1) {
    if (this.fullLength * this.fadeTime > this.length) {
      this.strokeAlpha = this.length / (this.fullLength * this.fadeTime) * this.alpha; //change for target alpha)
    } else if (this.fullLength * (1 - this.fadeTime) < this.length) {
      this.strokeAlpha = (this.fullLength - this.length) / (this.fullLength * this.fadeTime) * this.alpha;
    } else {
      this.strokeAlpha = this.alpha;
    }
    this.length++;
  }
}

class LineWarningPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    //  Register our new Game Object type
    pluginManager.registerGameObject("lineWarning", this.createLineWarning);
  }

  createLineWarning(x1, y1, x2, y2, width, length, fadeTime = 0.3) {
    return this.displayList.add(
      new LineWarning(this.scene, x1, y1, x2, y2, width, length, fadeTime)
    );
  }
}
