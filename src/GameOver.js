/* eslint-disable */
/**
 *
 * @constructor
 */
var GameOverScene = function () {
  //Game Over文字
  this._go = this.createGo();

  //medal面板
  this._medalPanel = this.createMedalPanel();

  this._restartBtn = this.createRestartBtn();

  this._bottom = this.createBottom();

  this._moveDownAction = Tiny.MoveTo(1500, {y: Tiny.WIN_SIZE.height - 320 - this._go.height / 2});
  this._moveDownAction.setEasing(Tiny.TWEEN.Easing.Bounce.Out);

  this._moveUpAction = Tiny.MoveTo(1000, {y: Tiny.WIN_SIZE.height - 320});
  this._moveUpAction.setEasing(Tiny.TWEEN.Easing.Quintic.Out);

  var self = this;
  this._moveDownAction.onComplete = function () {
    Sound.playSwooshingSound();
    self._bottom.runAction(self._moveUpAction);
  };
};

GameOverScene.prototype.init = function () {
  var sprite = new Tiny.Sprite();
  sprite._scene = this;

  sprite.addChild(this._go);
  sprite.addChild(this._bottom);

  return sprite;
};

GameOverScene.prototype.createGo = function () {
  var sprite = Tiny.Sprite.fromImage(RESOURCES['s_game_over']);
  sprite.setAnchor(0.5, 1);
  sprite.setPosition(Tiny.WIN_SIZE.width / 2, 0);
  return sprite;
};

GameOverScene.prototype.createBottom = function () {
  var sprite = new Tiny.Sprite();
  sprite.addChild(this._medalPanel);
  sprite.addChild(this._restartBtn);

  sprite.setPosition(Tiny.WIN_SIZE.width / 2 - this._medalPanel.width / 2, Tiny.WIN_SIZE.height);

  return sprite;
};

GameOverScene.prototype.createMedalPanel = function () {
  var sprite = Tiny.Sprite.fromImage(RESOURCES['s_button_score']);

  sprite.addChild(this.createMedal());
  sprite.addChild(this.createScore());
  sprite.addChild(this.createBest());

  return sprite;
};

GameOverScene.prototype.createMedal = function () {
  var sprite = new Tiny.Sprite();
  var s = this.getScore(), n = 0;
  if (s >= 10 && s < 20) {
    n = 1;
  } else if (s >= 20 && s < 30) {
    n = 2;
  } else if (s >= 30 && s < 40) {
    n = 3;
  } else if (s >= 40) {
    n = 4;
  }
  if (n != 0) {
    sprite.addChild(Tiny.Sprite.fromImage(RESOURCES['s_medal' + n]));
  }

  sprite.setPosition(31, 44);

  return sprite;
};

GameOverScene.prototype.createScore = function (score) {
  var sprite = new Tiny.Sprite();
  var s = (score ? score : this.getScore()) + '', w = 0;
  for (var i = 0; i < s.length; i++) {
    var num = Tiny.Sprite.fromImage(RESOURCES['s_s_font' + s[i]]);
    num.setAnchor(1, 0);
    num.setPosition(i * 16, 0);
    w = i * 16;
    sprite.addChild(num);
  }

  sprite.setPosition(208 - w, 38);
  return sprite;
};

GameOverScene.prototype.createBest = function () {
  var sprite = this.createScore(this.getBestScore());
  sprite.setPositionY(80);

  return sprite;
};

GameOverScene.prototype.createRestartBtn = function () {
  var btn = Tiny.Sprite.fromImage(RESOURCES['s_button_play']);
  btn.setAnchor(0.5, 0.5);
  btn.setPosition(this._medalPanel.width / 2, this._medalPanel.height + 54);
  btn.setEventEnabled(true);

  btn.tap = btn.mouseup = this.onRestart;

  return btn;
};

GameOverScene.prototype.getScore = function () {
  return Score.get();
};

GameOverScene.prototype.getBestScore = function () {
  return Score.getBest();
};

GameOverScene.prototype.runAction = function () {
  Sound.playSwooshingSound();
  this._go.runAction(this._moveDownAction);
};

GameOverScene.prototype.onRestart = function () {
  console.log('--- restart ---');

  Sound.playSwooshingSound();

  Tiny.app.replaceScene(new StartLayer(), 'Fade');

};

GameOverScene.create = function () {
  var scene = new GameOverScene();
  return scene.init();
};
