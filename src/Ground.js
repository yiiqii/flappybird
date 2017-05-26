/* eslint-disable */
var GroundScene = function () {
};

GroundScene.prototype.init = function () {
  var sprite = new Tiny.Sprite();
  var one = this.createSprite();
  var two = this.createSprite();
  var spriteWidth = one.width;

  two.setPosition(spriteWidth, 0);

  sprite.addChild(one);
  sprite.addChild(two);
  sprite.setPosition(0, Tiny.WIN_SIZE.height);

  var moveByAction = Tiny.MoveTo(1500, {x: -(spriteWidth / 2)});
  sprite.runAction(Tiny.RepeatForever(moveByAction));

  return sprite;
};

GroundScene.prototype.createSprite = function () {
  var sprite = Tiny.Sprite.fromImage(RESOURCES['s_ground']);
  sprite.setAnchor(0, 1);
  return sprite;
};

GroundScene.create = function () {
  var scene = new GroundScene();
  return scene.init();
};
