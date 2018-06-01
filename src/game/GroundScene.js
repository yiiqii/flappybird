import RESOURCES from './Resource';

class GroundScene {
  init() {
    const sprite = new Tiny.Sprite();
    const one = this.createSprite();
    const two = this.createSprite();
    const spriteWidth = one.width;

    two.setPosition(spriteWidth, 0);

    sprite.addChild(one);
    sprite.addChild(two);
    sprite.setPosition(0, Tiny.WIN_SIZE.height);

    const moveToAction = Tiny.MoveTo(1500, { x: -(spriteWidth / 2) });
    sprite.runAction(Tiny.RepeatForever(moveToAction));

    return sprite;
  }

  createSprite() {
    const sprite = Tiny.Sprite.fromImage(RESOURCES[ 's_ground' ]);
    sprite.setAnchor(0, 1);
    return sprite;
  };

  static create() {
    const scene = new GroundScene();
    return scene.init();
  }
}

export default GroundScene;
