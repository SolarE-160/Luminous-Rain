const config = {
  type: Phaser.AUTO,
  width: 900,
  height: 600,
  resolution: window.devicePixelRatio,
  backgroundColor: "#1e1e46",
  physics: {
    default: 'arcade',
    arcade: {
      //gravity: { y: 200 },
      enableBody: true,
    }
  },
  plugins: {
    global: [
      { key: "BulletPlugin", plugin: BulletPlugin, start: true },
      { key: "CircleWarningPlugin", plugin: CircleWarningPlugin, start: true },
      { key: "LineWarningPlugin", plugin: LineWarningPlugin, start: true },
    ],
  },
  scene: [Altale],
};

const g = new Phaser.Game(config);

//const fpsLogger = setInterval(() => {console.log(g.loop.actualFps);}, 1000);
