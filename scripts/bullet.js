// mixin object that provides movement to the bullets
let movingObject = {
  draw(trate = 1) {
    let rate = trate;
    if (this.delay <= 0) {
      this.visible = true;
      this.x += this.vx;
      this.y += this.vy;
      this.vy += this.grav;
      if (this.x < 0 || this.x > 800) {
        this.vx *= -1;
      }
      if (this.y < 0 || this.y > 600) {
        this.vy *= -1;
      }
    } else {
      this.delay--;
      this.visible = false;
    }
  },
};

class Bullet extends Phaser.GameObjects.Ellipse {
  constructor(scene, x, y, vx, vy, r, delay, grav = 0.01, color = 0x0080ff) {
    super(scene, x, y, r * 2, r * 2, 0xffffff);
    this.vx = vx;
    this.vy = vy;
    this.grav = grav;
    this.color = color;
    this.r = r;
    this.delay = delay;
    this.visible = delay > 0 ? false : true;
    Object.assign(this, movingObject);
  }
  /*
    draw(trate=1) {
        let rate = trate;
        if (this.delay <= 0) {
          this.visible = true;
            this.x += this.vx;
            this.y += this.vy;
          if (this.x < 0 || this.x > 800) {
            this.vx *= -1;
          }
          if (this.y < 0 || this.y > 600) {
            this.vy *= -1;
          }
        } else {
            this.delay--;
          this.visible = false;
        }
    }
    */
}

class BulletGlow extends Phaser.GameObjects.PointLight {
  constructor(scene, x, y, vx, vy, r, delay, grav = 0.01, color = 0x0080ff) {
    super(scene, x, y, color, r * 4, 0.6, 0.07);
    this.vx = vx;
    this.vy = vy;
    this.grav = grav;
    this.delay = delay;
    this.visible = delay > 0 ? false : true;
    Object.assign(this, movingObject);
  }

  /*
    draw(trate=1) {
        let rate = trate;
        if (this.delay <= 0) {
          this.visible = true;
            this.x += this.vx;
            this.y += this.vy;
          if (this.x < 0 || this.x > 800) {
            this.vx *= -1;
          }
          if (this.y < 0 || this.y > 600) {
            this.vy *= -1;
          }
        } else {
            this.delay--;
          this.visible = false;
        }
    }
    */
}

class BulletPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    //  Register our new Game Object type
    pluginManager.registerGameObject("bullet", this.createBullet);
  }

  createBullet(x, y, vx, vy, r, delay, grav = 0.01, color = 0x0080ff) {
    return this.displayList.add(
      new Bullet(this.scene, x, y, vx, vy, r, delay, grav, color)
    );
  }
}

class GlowPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    //  Register our new Game Object type
    pluginManager.registerGameObject("bulletGlow", this.createBullet);
  }

  createBullet(x, y, vx, vy, r, delay, grav = 0.01, color = 0x0080ff) {
    return this.displayList.add(
      new BulletGlow(this.scene, x, y, vx, vy, r, delay, grav, color)
    );
  }
}

/*
class GlowBulletPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('glowBullet', this.createBullet);
    }

    createBullet(x, y, vx, vy, r, delay) {
        return this.displayList.add(new BulletShadow(this.scene, x, y, vx, vy, r, delay));
    }

}*/
