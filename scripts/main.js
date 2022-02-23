const config = {
  type: Phaser.AUTO,
  width: 800,
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
      { key: "GlowPlugin", plugin: GlowPlugin, start: true },
    ],
  },
  scene: [Altale],
};

const g = new Phaser.Game(config);

//const fpsLogger = setInterval(() => {console.log(g.loop.actualFps);}, 1000);
