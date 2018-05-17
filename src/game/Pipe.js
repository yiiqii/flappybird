import RESOURCES from './Resource';

class Pipe extends Tiny.Sprite {
  constructor(pos) {
    const textures = [
      Tiny.Texture.fromImage(RESOURCES['s_pipe_bottom']),
      Tiny.Texture.fromImage(RESOURCES['s_pipe_top']),
    ];

    super(textures[pos]);

    this.setAnchor(0.5, 1);
  }
}

export default Pipe;
