/* eslint-disable */
/**
 * Bird
 * @constructor
 */
var Bird = function (p) {
  this._type = Math.ceil(Math.random() * 3) - 1;
  this._upRotation = -(Tiny.PI_2 / 12).toFixed(5);
  this._fallRotation = (Tiny.PI_2 / 6).toFixed(5);

  this._delta = 0;
  this._isFall = false;
  this._die = false;

  var textures = [];
  for (var i = 0; i < 4; i++) {
    textures.push(new Tiny.Texture.fromImage(RESOURCES['s_bird' + this._type + '_' + (i == 3 ? 1 : i)]));
  }

  Tiny.AnimatedSprite.call(this, textures);

  //帧帧动画速度
  this.animationSpeed = 0.12;

  this.setAnchor(0.5);
  this.setPosition(p.x, p.y);

  var self = this;

  //弹跳action
  this._jumpToAction = Tiny.JumpTo(1500, Tiny.point(this.x, this.y), 10, 2);

  //飞翔action
  this._rotateTo30Action = Tiny.RotateTo(250, {rotation: this._upRotation});
  this._rotateTo30Action.setEasing(Tiny.TWEEN.Easing.Exponential.Out);

  //平飞action
  this._rotateBack = Tiny.RotateTo(150, {rotation: 0});
  this._rotateBack.setDelay(50);

  //坠落旋转action
  this._rotateToR90Action = Tiny.RotateTo(100, {rotation: this._fallRotation});

  //坠落下降
  this._moveToAction = Tiny.MoveTo(800, Tiny.point(this.x, Tiny.WIN_SIZE.height - 120));
  this._moveToAction.setEasing(Tiny.TWEEN.Easing.Quadratic.In);

  //飞翔回调，触发一次飞翔，但是结束后要回到平飞状态
  this._rotateTo30Action.onComplete = function () {
    //200ms没有触发再回到平飞状态
    if (self._delta > 200) {
      self.runAction(self._rotateBack);
    }
  };
};

Bird.prototype = Object.create(Tiny.AnimatedSprite.prototype);
Bird.prototype.constructor = Bird;

Bird.prototype.fly = function () {
  this.play();
  this.jump();
};

Bird.prototype.jump = function () {
  this.runAction(Tiny.RepeatForever(this._jumpToAction));
};

Bird.prototype.up = function (time) {
  Sound.playWingSound();
  this._delta = time;
  this.runAction(this._rotateTo30Action);
};

Bird.prototype.fall = function () {
  this.runAction(this._rotateToR90Action);
};

Bird.prototype.die = function () {
  this._die = true;
//    this.cleanup();
  this.stop();
};

Bird.prototype.down = function () {
  this._die = true;
  this.fall();
  this.runAction(this._moveToAction);
  this.stop();
};

Bird.prototype.cleanup = function () {
  Tiny.Action.cleanup(this);
};

/**
 * BirdScene
 * @constructor
 */
var BirdScene = function (p) {
  this._p = p;
};

BirdScene.prototype.init = function () {
  var bird = new Bird(this._p);
  bird.gotoAndStop(1);

  return bird;
};

BirdScene.create = function (p) {
  var scene = new BirdScene(p);
  return scene.init();
};
