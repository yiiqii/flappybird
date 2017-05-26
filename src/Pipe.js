/* eslint-disable */
/**
 *
 * @constructor
 */
var Pipe = function (pos) {
  var textures = [
    Tiny.Texture.fromImage(RESOURCES['s_pipe_bottom']),
    Tiny.Texture.fromImage(RESOURCES['s_pipe_top'])
  ];

  Tiny.Sprite.call(this, textures[pos]);

  this.setAnchor(0.5, 1);
};

Pipe.prototype = Object.create(Tiny.Sprite.prototype);
Pipe.prototype.constructor = Pipe;

/**
 * PipeScene
 * @constructor
 */
var PipeScene = function () {
  this._pipeArray = [];
  this._pipeOffsetX = Tiny.WIN_SIZE.width / 2;
  this._pipeOffsetY = 120;
  this._randomSection = [80, 240];
};

PipeScene.prototype.init = function () {
  var pipes = new Tiny.Sprite();
  pipes._scene = this;

  for (var i = 0; i < 3; i++) {
    var pb = new Pipe(0);
    var pt = new Pipe(1);
    var positionX = this._pipeOffsetX * i + Tiny.WIN_SIZE.width * 2;
    var ran = this.randomBottom();
    pb.setPosition(positionX, ran + this._pipeOffsetY + 320);
    pt.setPosition(positionX, ran);
    pipes.addChild(pb);
    pipes.addChild(pt);
    this._pipeArray.push({
      b: pb,
      t: pt
    });
  }

  return pipes;
};

PipeScene.prototype.randomBottom = function () {
  return Tiny.random(this._randomSection);
};

PipeScene.create = function () {
  var scene = new PipeScene();
  return scene.init();
};
