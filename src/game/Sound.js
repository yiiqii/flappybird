import RESOURCES from './Resource';
class Sound {
  static playSfx(sfx) {
    // @ts-ignore
    const audio = Tiny.audio.manager.getAudio(sfx);
    audio.play();
  };

  static playDieSound() {
    this.playSfx(RESOURCES['s_die_ogg']);
  };

  static playHitSound() {
    this.playSfx(RESOURCES['s_hit_ogg']);
  };

  static playPointSound() {
    this.playSfx(RESOURCES['s_point_ogg']);
  };

  static playSwooshingSound() {
    this.playSfx(RESOURCES['s_swooshing_ogg']);
  };

  static playWingSound() {
    this.playSfx(RESOURCES['s_wing_ogg']);
  }
}

export default Sound;
