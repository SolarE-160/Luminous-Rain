const config = {
  type: Phaser.WEBGL,
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
      { key: "BulletPlugin", plugin: BulletPlugin, start: true},
      { key: "PulsarBulletPlugin", plugin: PulsarBulletPlugin, start: true},
      { key: "StarBulletPlugin", plugin: StarBulletPlugin, start: true},
      { key: "CircleWarningPlugin", plugin: CircleWarningPlugin, start: true },
      { key: "LineWarningPlugin", plugin: LineWarningPlugin, start: true },
    ],
  },
  scene: [MainMenu, Altale, Kronos],
};

//console.clear();
const g = new Phaser.Game(config);

//const fpsLogger = setInterval(() => {console.log(g.loop.actualFps);}, 1000);
