/* eslint-disable */
/**
 * Score
 * @constructor
 */
var Score = function () {

  //得分
  this._goal = 0;

  Tiny.Sprite.call(this);
};

Score.prototype = Object.create(Tiny.Sprite.prototype);
Score.prototype.constructor = Score;

Score.prototype.update = function () {
  var s = this._goal + '', w = 0;
  this.removeChildren();
  for (var i = 0; i < s.length; i++) {
    var num = Tiny.Sprite.fromImage(RESOURCES['s_b_font' + s[i]]);
    num.setAnchor(0.5);
    num.setPosition(i * 30, 0);
    w = i * 30 / 2;
    this.addChild(num);
  }
  this.setPosition(Tiny.WIN_SIZE.width / 2 - w, Tiny.WIN_SIZE.height / 2 - 180);
};

Score.get = function () {
  return ~~Util.storage.get('SCORE');
};

Score.set = function (n) {
  var best = Score.getBest();
  if (best < n) {
    Score.setBest(n);
  }
  Util.storage.set('SCORE', n);
};

Score.getBest = function () {
  return ~~Util.storage.get('BEST');
};

Score.setBest = function (n) {
  Util.storage.set('BEST', n);
};

/**
 * ScoreScene
 * @constructor
 */
var ScoreScene = function () {
};

ScoreScene.prototype.init = function () {
  var score = new Score();

  return score;
};

ScoreScene.create = function () {
  var scene = new ScoreScene();
  return scene.init();
};
