/* eslint-disable */

var BackgroundScene = function () {
  this._bgs = ['s_bg_day', 's_bg_night'];
  this._index = this._bgs[Math.round(Math.random())]
};

BackgroundScene.prototype.init = function () {
  var texture = Tiny.Texture.fromImage(RESOURCES[this._index]);
  texture.width = Tiny.WIN_SIZE.width;
  texture.height = Tiny.WIN_SIZE.height;

  var sprite = new Tiny.Sprite(texture);
  sprite.width = Tiny.WIN_SIZE.width;
  sprite.height = Tiny.WIN_SIZE.height;

  return sprite;
};

BackgroundScene.create = function () {
  var scene = new BackgroundScene();
  return scene.init();
};
