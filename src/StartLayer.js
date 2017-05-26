/* eslint-disable */

var StartLayer = function () {
  this._start = false;
  this._t = 0;
  this._v = 0;
  this._in = true;

  this._timeFlag = (new Date()).getTime();
  //是否通过序列中的第一道管子
  this._crossFlag = false;

  //背景
  this._background = BackgroundScene.create();

  //地面
  this._ground = GroundScene.create();

  //score
  this._score = ScoreScene.create();

  //Get Ready!
  this._ready = this.createReady();

  //鸟
  this._bird = BirdScene.create(new Tiny.point(Tiny.WIN_SIZE.width / 2 - 60, Tiny.WIN_SIZE.height / 2));

  //Tip
  this._tip = this.createTip();
  this._tip.setEventEnabled(true);
  this._tip.tap = this._tip.mouseup = this.onStart;

  //管道
  this._pipes = PipeScene.create();

  Tiny.Container.call(this);

  this.interactive = true;

  var self = this;
  this.tap = this.mouseup = function (e) {
    if (!self._bird._die && self._start && self._in) {
      var now = (new Date()).getTime();

      var time = now - self._timeFlag;
      self._timeFlag = now;

      self.birdUp(time);
      self._bird._isFall = false;
      self._t = 0;
    }
  };

  this.init();
};
StartLayer.prototype = Object.create(Tiny.Container.prototype);
StartLayer.prototype.constructor = StartLayer;

StartLayer.prototype.init = function () {
  this.addChild(this._background);
  this.addChild(this._ready);
  this.addChild(this._tip);
  this.addChild(this._pipes);
  this.addChild(this._bird);
  this.addChild(this._ground);
  this.addChild(this._score);

  this._score.update();
  this._bird.fly();
};

StartLayer.prototype.createReady = function () {
  var ready = Tiny.Sprite.fromImage(RESOURCES['s_ready']);
  ready.setAnchor(0.5);
  ready.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height / 2 - 100);

  return ready;
};

StartLayer.prototype.createTip = function () {
  var tip = Tiny.Sprite.fromImage(RESOURCES['s_tip']);
  tip.setAnchor(0.5);
  tip.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height / 2 + 20);

  return tip;
};

StartLayer.prototype.onStart = function (e) {
  var self = e.target.parent;

  Sound.playWingSound();

  self._start = true;
  self._time = (new Date()).getTime();

  self.removeChild(self._tip);
  self.removeChild(self._ready);

  self._bird.cleanup();
};

//OVERWRITE
StartLayer.prototype.updateTransform = function () {
  var self = this;
  if (this._start) {

    var bird = this._bird;

    if (!bird._die) {
      this._t++;
      this._v--;

      //鸟
      var bPrePos = bird.getPositionY();
      bird.setPositionY(bPrePos + 0.1 * (this._t - this._v));
      if (bPrePos >= Tiny.WIN_SIZE.height - 112) {
        bird.setPositionY(Tiny.WIN_SIZE.height - 120);
        bird.die();
      } else if (bPrePos < 0) {
        this._in = false;
      }

      //管子
      var pipes = this._pipes;
      var pipesScene = pipes._scene;
      var pa = pipesScene._pipeArray;

      pa.forEach(function (pac) {
        var prePos = Number(parseFloat(pac.b.getPositionX()).toFixed(2)), pipeWidth = pac.b.getBounds().width;
        if (prePos + pipeWidth / 2 <= 0) {
          var ran = pipesScene.randomBottom();
          prePos = pipesScene._pipeOffsetX * 3;
          pac.b.setPositionY(ran + pipesScene._pipeOffsetY + 320);
          pac.t.setPositionY(ran);
          self._crossFlag = false;
        }
        pac.b.setPositionX(prePos - 1.4);
        pac.t.setPositionX(prePos - 1.4);
        if (Math.round(prePos) + pipeWidth / 2 - parseInt(self._bird.getPositionX()) <= 0 && !self._crossFlag) {
          Sound.playPointSound();
          self._score._goal++;
          self._crossFlag = true;
        }
        //碰撞检测
        if (self.collide(bird, pac.b) || self.collide(bird, pac.t)) {
          Sound.playDieSound();
          bird.down();
        }
      });

      //TODO 坠落的特殊性，但是此处逻辑有性能问题
      if (!bird._isFall && (new Date()).getTime() - this._timeFlag > 600) {
        bird._isFall = true;
        bird.fall();
      }

      this._score.update();
    } else {
      this.gameOver();
    }
  }

  this.containerUpdateTransform();
};

StartLayer.prototype.birdUp = function (time) {
  this._v = 40;
  this._bird.up(time);
};

StartLayer.prototype.collide = function (a, b) {
  var aRect = a.getBounds();
  var bRect = b.getBounds();
  bRect.x += 5;
  bRect.y += 5;
  bRect.height -= 5;
  bRect.width -= 5;
  return Tiny.rectIntersectsRect(aRect, bRect);
};

StartLayer.prototype.gameOver = function () {
  console.log('--- game over ---');

  Sound.playHitSound();

  this._start = false;
  Score.set(this._score._goal);
  this.removeChild(this._score);
  Tiny.Action.cleanup(this._ground);

  //Game Over
  this._gameOver = GameOverScene.create();
  this.addChild(this._gameOver);
  this._gameOver._scene.runAction();
};
