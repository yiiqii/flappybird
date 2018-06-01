import Bird from './Bird';

class BirdScene {
  constructor(p) {
    this._p = p;
  }

  init() {
    const bird = new Bird(this._p);
    bird.gotoAndStop(1);
    return bird;
  }

  static create(p) {
    const scene = new BirdScene(p);
    return scene.init();
  }
}

export default BirdScene;
