/* eslint-disable */

const dirImg = 'res/images/';
const dirSound = 'res/sounds/';

const RESOURCES = {
  s_bg_day: dirImg + 'bg_day.png',
  s_bg_night: dirImg + 'bg_night.png',
  s_logo: dirImg + 'title.png',
  s_ready: dirImg + 'ready.png',
  s_game_over: dirImg + 'game_over.png',

  s_button_play: dirImg + 'button_play.png',
  s_ground: dirImg + 'ground.png',
  s_pipe_bottom: dirImg + 'pipe_bottom.png',
  s_pipe_top: dirImg + 'pipe_top.png',
  s_button_score: dirImg + 'button_score.png',
  s_tip: dirImg + 'tip.png',

  s_die_ogg: dirSound + "sfx_die.ogg",
  s_hit_ogg: dirSound + "sfx_hit.ogg",
  s_point_ogg: dirSound + "sfx_point.ogg",
  s_swooshing_ogg: dirSound + "sfx_swooshing.ogg",
  s_wing_ogg: dirSound + "sfx_wing.ogg"
};

for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    RESOURCES['s_bird' + i + '_' + j] = dirImg + 'bird' + i + '_' + j + '.png';
  }
}
for (let i = 0; i < 10; i++) {
  RESOURCES['s_b_font' + i] = dirImg + 'b' + i + '.png';
}
for (let i = 0; i < 10; i++) {
  RESOURCES['s_s_font' + i] = dirImg + 's' + i + '.png';
}
for (let i = 1; i <= 4; i++) {
  RESOURCES['s_medal' + i] = dirImg + 'medal_' + i + '.png';
}

export default RESOURCES;
