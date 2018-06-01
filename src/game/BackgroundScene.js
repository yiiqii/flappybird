import RESOURCES from './Resource';

class BackgroundScene {
  constructor() {
    this._bgs = [ 's_bg_day', 's_bg_night' ];
    this._index = this._bgs[ Math.round(Math.random()) ];
  }

  init() {
    const texture = Tiny.Texture.fromImage(RESOURCES[ this._index ]);
    const sprite = new Tiny.Sprite(texture);
    sprite.width = Tiny.WIN_SIZE.width;
    sprite.height = Tiny.WIN_SIZE.height;
    return sprite;
  }

  static create() {
    const scene = new BackgroundScene();
    return scene.init();
  }
}

export default BackgroundScene;
