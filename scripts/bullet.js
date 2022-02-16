class Bullet extends Phaser.GameObjects.Ellipse {
    constructor(scene, x, y, vx, vy, r, delay, grav=0.01, color=0x0080ff) {
        super(scene, x, y, r * 2, r * 2, 0xffffff);
        this.vx = vx;
        this.vy = vy;
        this.delay = delay;
        this.active = (delay > 0) ? false : true;
        this.isStroked = true;
        this.strokeColor = color;
    }
}

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