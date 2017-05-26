/* eslint-disable */

var MainMenuLayer = function () {

  //背景
  this._background = BackgroundScene.create();

  //地面
  this._ground = GroundScene.create();

  //Logo
  this._logo = this.createLogo();

  //鸟
  this._bird = BirdScene.create(new Tiny.point(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height / 2 - 30));

  //开始按钮
  this._startBtn = this.createStartBtn();
  this._startBtn.setEventEnabled(true);
  this._startBtn.tap = this._startBtn.mouseup = this.onReady;

  Tiny.Container.call(this);
  this.init();
};
MainMenuLayer.prototype = Object.create(Tiny.Container.prototype);
MainMenuLayer.prototype.constructor = MainMenuLayer;

MainMenuLayer.prototype.init = function () {
  this.addChild(this._background);
  this.addChild(this._ground);
  this.addChild(this._logo);
  this.addChild(this._bird);
  this.addChild(this._startBtn);

  this._bird.fly();
};

MainMenuLayer.prototype.createLogo = function () {
  var logo = Tiny.Sprite.fromImage(RESOURCES['s_logo']);
  logo.setAnchor(0.5);
  logo.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height / 2 - 100);

  return logo;
};

MainMenuLayer.prototype.createStartBtn = function () {
  var btn = Tiny.Sprite.fromImage(RESOURCES['s_button_play']);
  btn.setAnchor(0.5);
  btn.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height - 138);

  return btn;
};

MainMenuLayer.prototype.onReady = function () {
  console.log('--- start ---');

  Sound.playSwooshingSound();

  Tiny.app.replaceScene(new StartLayer(), 'Fade');

};
