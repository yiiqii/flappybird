import RESOURCES from './Resource';
import Sound from './Sound';

class Bird extends Tiny.AnimatedSprite {
  constructor(p) {
    const type = Math.ceil(Math.random() * 3) - 1;
    var textures = [];
    for (var i = 0; i < 4; i++) {
      textures.push(Tiny.Texture.fromImage(RESOURCES[ 's_bird' + type + '_' + (i === 3 ? 1 : i) ]));
    }

    super(textures);

    this._type = type;
    this._upRotation = -(Tiny.PI_2 / 12).toFixed(5);
    this._fallRotation = (Tiny.PI_2 / 6).toFixed(5);

    this._delta = 0;
    this._isFall = false;
    this._die = false;

    //帧帧动画速度
    this.animationSpeed = 0.12;

    this.setAnchor(0.5);
    this.setPosition(p.x, p.y);

    var self = this;

    const point = Tiny.point(this.x, this.y);
    // @ts-ignore 弹跳action
    this._jumpToAction = Tiny.JumpTo(1500, point, 10, 2);

    //飞翔action
    this._rotateTo30Action = Tiny.RotateTo(250, { rotation: this._upRotation });
    this._rotateTo30Action.setEasing(Tiny.TWEEN.Easing.Exponential.Out);

    //平飞action
    this._rotateBack = Tiny.RotateTo(150, { rotation: 0 });
    this._rotateBack.setDelay(50);

    // @ts-ignore 坠落旋转action
    this._rotateToR90Action = Tiny.RotateTo(100, { rotation: this._fallRotation });

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
  }

  fly() {
    this.play();
    this.jump();
  }

  jump() {
    this.runAction(Tiny.RepeatForever(this._jumpToAction));
  }

  up(time) {
    Sound.playWingSound();
    this._delta = time;
    this.runAction(this._rotateTo30Action);
  }

  fall() {
    this.runAction(this._rotateToR90Action);
  }

  die() {
    this._die = true;
    //    this.cleanup();
    this.stop();
  }

  down() {
    this._die = true;
    this.fall();
    this.runAction(this._moveToAction);
    this.stop();
  }

  cleanup() {
    Tiny.Action.cleanup(this);
  }
}

export default Bird;
