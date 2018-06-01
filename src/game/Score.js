import RESOURCES from './Resource';
import Util from './Util';

class Score extends Tiny.Sprite {
  constructor() {
    super();
    //得分
    this._goal = 0;
  }

  update() {
    const s = this._goal + '';
    let w = 0;
    this.removeChildren();
    for (var i = 0; i < s.length; i++) {
      var num = Tiny.Sprite.fromImage(RESOURCES[ 's_b_font' + s[ i ] ]);
      num.setAnchor(0.5);
      num.setPosition(i * 30, 0);
      w = i * 30 / 2;
      this.addChild(num);
    }
    this.setPosition(Tiny.WIN_SIZE.width / 2 - w, Tiny.WIN_SIZE.height / 2 - 180);
  }

  static get() {
    return ~~Util.storage.get('SCORE');
  }

  static set(n) {
    const best = Score.getBest();
    if (best < n) {
      Score.setBest(n);
    }
    Util.storage.set('SCORE', n);
  }

  static getBest() {
    return ~~Util.storage.get('BEST');
  }

  static setBest(n) {
    Util.storage.set('BEST', n);
  }
}

export default Score;
