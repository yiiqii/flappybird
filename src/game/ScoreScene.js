import Score from './Score';

class ScoreScene {
  init() {
    return new Score();
  }

  static create() {
    const scene = new ScoreScene();
    return scene.init();
  }
}

export default ScoreScene;
