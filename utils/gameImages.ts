export const getImages = () => {
  const duckFront = new Image();
  duckFront.src = '/img/game/duck_front.png';

  const duckBack = new Image();
  duckBack.src = '/img/game/duck_back.png';

  const duckRight = new Image();
  duckRight.src = '/img/game/duck_right.png';

  const duckLeft = new Image();
  duckLeft.src = '/img/game/duck_left.png';

  const duckFound = new Image();
  duckFound.src = '/img/game/duck_found.png';

  const seekerFront = new Image();
  seekerFront.src = '/img/game/seeker_front.png';

  const seekerBack = new Image();
  seekerBack.src = '/img/game/seeker_back.png';

  const seekerRight = new Image();
  seekerRight.src = '/img/game/seeker_right.png';

  const seekerLeft = new Image();
  seekerLeft.src = '/img/game/seeker_left.png';

  const wall = new Image();
  wall.src = '/img/game/wall.png';

  return {
    duckFront,
    duckBack,
    duckRight,
    duckLeft,
    duckFound,
    seekerFront,
    seekerBack,
    seekerRight,
    seekerLeft,
    wall,
  };
};
