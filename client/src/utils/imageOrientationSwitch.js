export const rotateDeg = int => {
  let deg;
  switch (int) {
    case 1:
      deg = 0;
      break;
    case 6:
      deg = 90;
      break;
    case 8:
      deg = 270;
      break;
    default:
      deg = 0;
  }
  return deg;
};
