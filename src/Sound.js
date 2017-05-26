/* eslint-disable */

function Sound() {

}

Sound.playSfx = function (sfx) {
  var audio = Tiny.audioManager.getAudio(sfx);
  audio.play();
};

Sound.playDieSound = function () {
  this.playSfx(RESOURCES['s_die_ogg']);
};

Sound.playHitSound = function () {
  this.playSfx(RESOURCES['s_hit_ogg']);
};

Sound.playPointSound = function () {
  this.playSfx(RESOURCES['s_point_ogg']);
};

Sound.playSwooshingSound = function () {
  this.playSfx(RESOURCES['s_swooshing_ogg']);
};

Sound.playWingSound = function () {
  this.playSfx(RESOURCES['s_wing_ogg']);
};
