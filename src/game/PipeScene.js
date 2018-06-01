import Pipe from './Pipe';

class PipeScene {
  constructor() {
    this._pipeArray = [];
    this._pipeOffsetX = Tiny.WIN_SIZE.width / 2;
    this._pipeOffsetY = 120;
    this._randomSection = [ 80, 240 ];
  }

  init() {
    const pipes = new Tiny.Sprite();
    // @ts-ignore
    pipes._scene = this;

    for (let i = 0; i < 3; i++) {
      const pb = new Pipe(0);
      const pt = new Pipe(1);
      const positionX = this._pipeOffsetX * i + Tiny.WIN_SIZE.width * 2;
      const ran = this.randomBottom();
      pb.setPosition(positionX, ran + this._pipeOffsetY + 320);
      pt.setPosition(positionX, ran);
      pipes.addChild(pb);
      pipes.addChild(pt);
      this._pipeArray.push({
        b: pb,
        t: pt,
      });
    }

    return pipes;
  }

  randomBottom() {
    // @ts-ignore
    return Tiny.random(this._randomSection);
  }

  static create() {
    const scene = new PipeScene();
    return scene.init();
  }
}

export default PipeScene;
