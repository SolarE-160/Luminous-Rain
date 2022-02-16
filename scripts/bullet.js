class Bullet extends Phaser.GameObjects.Ellipse {
    constructor(scene, x, y, vx, vy, r, delay, grav=0.01, color=0x0080ff) {
        super(scene, x, y, r * 2, r * 2, 0xffffff);
        this.vx = vx;
        this.vy = vy;
        this.delay = delay;
        this.active = (delay > 0) ? false : true;
        this.setStrokeStyle(r / 2, color);
    }

    draw(trate=1) {
        let rate = trate;
        if (this.delay <= 0) {
            this.x += this.vx;
            this.y += this.vy;
        } else {
            this.delay--;
        }
    }
}
/*
class BulletShadow extends Bullet {
    constructor(scene, x, y, vx, vy, r, delay, grav=0.01, color=0x0080ff) {
        super(scene, x, y, vx, vy, r * 2, delay, grav, color);
        this.isStroked = false;
        this.fillColor = color;
        this.fillAlpha = 0.5;
    }

    draw(trate=1) {
        let rate = trate;
        if (this.delay <= 0) {
            this.x += this.vx;
            this.y += this.vy;
        } else {
            this.delay--;
        }
    }
}*/

class BulletPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('bullet', this.createBullet);
    }

    createBullet(x, y, vx, vy, r, delay) {
        return this.displayList.add(new Bullet(this.scene, x, y, vx, vy, r, delay));
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