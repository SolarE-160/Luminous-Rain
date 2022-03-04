const outerBoxMargin = 50; // how far beyond edge of canvas can bullets still exist :

// mixin object that provides movement to the bullets
let movingObject = {
  move(trate = 1) {
    let rate = trate;
    if (this.delay <= 0) {
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


class CircleWarning extends Phaser.GameObjects.PointLight {
  constructor(scene, x, y, r, length) {
    super(scene, x, y, 0xff0000, r, 0.4);
    this.alpha = 0
    this.length = 0;
    this.fullLength = length;
  }
  
  move(trate=1) {
    this.alpha = this.length / this.fullLength * 0.8; //change for target alpha
    this.length++;
  }
}

class CircleWarningPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    //  Register our new Game Object type
    pluginManager.registerGameObject("circleWarning", this.createCircleWarning);
  }

  createCircleWarning(x, y, r, length) {
    return this.displayList.add(
      new CircleWarning(this.scene, x, y, r, length)
    );
  }
}

class LineWarning extends Phaser.GameObjects.Line {
  constructor(scene, x1, y1, x2, y2, width, length) {
    super(scene, (x1 + x2) / 2, (y1 + y2) / 2, x1, y1, x2, y2, 0xff0000, 0);
    this.lineWidth = width;
    this.length = 0;
    this.fullLength = length;
  }
  
  move(trate=1) {
    this.strokeAlpha = this.length / this.fullLength * 0.8; //change for target alpha
    this.length++;
  }
}

class LineWarningPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    //  Register our new Game Object type
    pluginManager.registerGameObject("lineWarning", this.createLineWarning);
  }

  createLineWarning(x1, y1, x2, y2, width, length) {
    return this.displayList.add(
      new LineWarning(this.scene, x1, y1, x2, y2, width, length)
    );
  }
}
